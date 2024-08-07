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

void encrypt_file(const char *input_filename, const char *output_filename, unsigned char *key, unsigned char *iv) {
    FILE *input_file = fopen(input_filename, "rb");
    if (!input_file) {
        perror("Failed to open input file");
        exit(EXIT_FAILURE);
    }

    fseek(input_file, 0, SEEK_END);
    long input_file_len = ftell(input_file);
    fseek(input_file, 0, SEEK_SET);

    unsigned char *plaintext = (unsigned char *)malloc(input_file_len);
    if (!plaintext) {
        perror("Failed to allocate memory");
        exit(EXIT_FAILURE);
    }
    fread(plaintext, 1, input_file_len, input_file);
    fclose(input_file);

    unsigned char *ciphertext = (unsigned char *)malloc(input_file_len + AES_BLOCK_SIZE);
    if (!ciphertext) {
        perror("Failed to allocate memory");
        exit(EXIT_FAILURE);
    }

    int ciphertext_len = aes_encrypt(plaintext, input_file_len, key, iv, ciphertext);

    FILE *output_file = fopen(output_filename, "wb");
    if (!output_file) {
        perror("Failed to open output file");
        exit(EXIT_FAILURE);
    }
    fwrite(ciphertext, 1, ciphertext_len, output_file);
    fclose(output_file);

    free(plaintext);
    free(ciphertext);
}

void decrypt_file(const char *input_filename, const char *output_filename, unsigned char *key, unsigned char *iv) {
    FILE *input_file = fopen(input_filename, "rb");
    if (!input_file) {
        perror("Failed to open input file");
        exit(EXIT_FAILURE);
    }

    fseek(input_file, 0, SEEK_END);
    long input_file_len = ftell(input_file);
    fseek(input_file, 0, SEEK_SET);

    unsigned char *ciphertext = (unsigned char *)malloc(input_file_len);
    if (!ciphertext) {
        perror("Failed to allocate memory");
        exit(EXIT_FAILURE);
    }
    fread(ciphertext, 1, input_file_len, input_file);
    fclose(input_file);

    unsigned char *plaintext = (unsigned char *)malloc(input_file_len);
    if (!plaintext) {
        perror("Failed to allocate memory");
        exit(EXIT_FAILURE);
    }

    int plaintext_len = aes_decrypt(ciphertext, input_file_len, key, iv, plaintext);

    FILE *output_file = fopen(output_filename, "wb");
    if (!output_file) {
        perror("Failed to open output file");
        exit(EXIT_FAILURE);
    }
    fwrite(plaintext, 1, plaintext_len, output_file);
    fclose(output_file);

    free(ciphertext);
    free(plaintext);
}

int main(int argc, char *argv[]) {
    if (argc < 4) {
        fprintf(stderr, "Usage: %s <encrypt|decrypt> <input_file> <output_file> [key] [iv]\n", argv[0]);
        exit(EXIT_FAILURE);
    }

    const char *mode = argv[1];
    const char *input_filename = argv[2];
    const char *output_filename = argv[3];

    OpenSSL_add_all_algorithms();
    ERR_load_crypto_strings();

    if (strcmp(mode, "encrypt") == 0) {
        unsigned char key[AES_256_KEY_SIZE];
        unsigned char iv[AES_BLOCK_SIZE];
        generate_aes_key(key);
        generate_iv(iv);

        encrypt_file(input_filename, output_filename, key, iv);

        for (int i = 0; i < AES_256_KEY_SIZE; i++) {
            printf("%02x", key[i]);
        }
        printf("\n");
        for (int i = 0; i < AES_BLOCK_SIZE; i++) {
            printf("%02x", iv[i]);
        }
        printf("\n");

    } else if (strcmp(mode, "decrypt") == 0) {
        if (argc != 6) {
            fprintf(stderr, "Usage: %s decrypt <input_file> <output_file> <key> <iv>\n", argv[0]);
            exit(EXIT_FAILURE);
        }
        const char *key_hex = argv[4];
        const char *iv_hex = argv[5];

        unsigned char key[AES_256_KEY_SIZE];
        unsigned char iv[AES_BLOCK_SIZE];

        for (int i = 0; i < AES_256_KEY_SIZE; i++) {
            sscanf(&key_hex[i * 2], "%2hhx", &key[i]);
        }

        for (int i = 0; i < AES_BLOCK_SIZE; i++) {
            sscanf(&iv_hex[i * 2], "%2hhx", &iv[i]);
        }

        decrypt_file(input_filename, output_filename, key, iv);

    } else {
        fprintf(stderr, "Invalid mode: %s. Use 'encrypt' or 'decrypt'.\n", mode);
        exit(EXIT_FAILURE);
    }

    return 0;
}
