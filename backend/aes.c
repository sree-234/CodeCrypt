#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <openssl/evp.h>
#include <openssl/rand.h>
#include <openssl/err.h>

#define AES_256_KEY_SIZE 32
#define AES_BLOCK_SIZE 16

void handleErrors() {
    ERR_print_errors_fp(stderr);
    abort();
}

void generate_aes_key(unsigned char *key) {
    if (!RAND_bytes(key, AES_256_KEY_SIZE)) {
        handleErrors();
    }
}

void generate_iv(unsigned char *iv) {
    if (!RAND_bytes(iv, AES_BLOCK_SIZE)) {
        handleErrors();
    }
}

int aes_encrypt(unsigned char *plaintext, int plaintext_len, unsigned char *key, unsigned char *iv, unsigned char *ciphertext) {
    EVP_CIPHER_CTX *ctx = EVP_CIPHER_CTX_new();
    if (!ctx) {
        handleErrors();
    }

    if (1 != EVP_EncryptInit_ex(ctx, EVP_aes_256_cbc(), NULL, key, iv)) {
        handleErrors();
    }

    int len;
    int ciphertext_len;

    if (1 != EVP_EncryptUpdate(ctx, ciphertext, &len, plaintext, plaintext_len)) {
        handleErrors();
    }
    ciphertext_len = len;

    if (1 != EVP_EncryptFinal_ex(ctx, ciphertext + len, &len)) {
        handleErrors();
    }
    ciphertext_len += len;

    EVP_CIPHER_CTX_free(ctx);

    return ciphertext_len;
}

int aes_decrypt(unsigned char *ciphertext, int ciphertext_len, unsigned char *key, unsigned char *iv, unsigned char *plaintext) {
    EVP_CIPHER_CTX *ctx = EVP_CIPHER_CTX_new();
    if (!ctx) {
        handleErrors();
    }

    if (1 != EVP_DecryptInit_ex(ctx, EVP_aes_256_cbc(), NULL, key, iv)) {
        handleErrors();
    }

    int len;
    int plaintext_len;

    if (1 != EVP_DecryptUpdate(ctx, plaintext, &len, ciphertext, ciphertext_len)) {
        handleErrors();
    }
    plaintext_len = len;

    if (1 != EVP_DecryptFinal_ex(ctx, plaintext + len, &len)) {
        handleErrors();
    }
    plaintext_len += len;

    EVP_CIPHER_CTX_free(ctx);

    return plaintext_len;
}

int main(int argc, char *argv[]) {
    if (argc < 3) {
        fprintf(stderr, "Usage: %s <encrypt|decrypt> <message|ciphertext> [key] [iv]\n", argv[0]);
        exit(EXIT_FAILURE);
    }

    const char *mode = argv[1];
    const char *message = argv[2];

    OpenSSL_add_all_algorithms();
    ERR_load_crypto_strings();

    if (strcmp(mode, "encrypt") == 0) {
        unsigned char key[AES_256_KEY_SIZE];
        unsigned char iv[AES_BLOCK_SIZE];
        generate_aes_key(key);
        generate_iv(iv);

        unsigned char ciphertext[1024];
        int ciphertext_len = aes_encrypt((unsigned char*)message, strlen(message), key, iv, ciphertext);

        for (int i = 0; i < ciphertext_len; i++) {
            printf("%02x", ciphertext[i]);
        }
        printf("\n");
        for (int i = 0; i < AES_256_KEY_SIZE; i++) {
            printf("%02x", key[i]);
        }
        printf("\n");
        for (int i = 0; i < AES_BLOCK_SIZE; i++) {
            printf("%02x", iv[i]);
        }
        printf("\n");

    } else if (strcmp(mode, "decrypt") == 0) {
        if (argc != 5) {
            fprintf(stderr, "Usage: %s decrypt <ciphertext> <key> <iv>\n", argv[0]);
            exit(EXIT_FAILURE);
        }
        const char *key_hex = argv[3];
        const char *iv_hex = argv[4];

        unsigned char key[AES_256_KEY_SIZE];
        unsigned char iv[AES_BLOCK_SIZE];
        unsigned char ciphertext[strlen(message) / 2];
        unsigned char decryptedtext[1024];

        for (int i = 0; i < AES_256_KEY_SIZE; i++) {
            sscanf(&key_hex[i * 2], "%2hhx", &key[i]);
        }

        for (int i = 0; i < AES_BLOCK_SIZE; i++) {
            sscanf(&iv_hex[i * 2], "%2hhx", &iv[i]);
        }

        for (int i = 0; i < strlen(message) / 2; i++) {
            sscanf(&message[i * 2], "%2hhx", &ciphertext[i]);
        }

        int decrypted_len = aes_decrypt(ciphertext, strlen(message) / 2, key, iv, decryptedtext);
        decryptedtext[decrypted_len] = '\0';

        printf("%s\n", decryptedtext);

    } else {
        fprintf(stderr, "Invalid mode: %s. Use 'encrypt' or 'decrypt'.\n", mode);
        exit(EXIT_FAILURE);
    }

    return 0;
}
