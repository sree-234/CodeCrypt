#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <openssl/rsa.h>
#include <openssl/pem.h>
#include <openssl/err.h>

#define KEY_LENGTH 2048
#define PUBLIC_EXPONENT 65537
#define PADDING RSA_PKCS1_OAEP_PADDING

void handleErrors() {
    ERR_print_errors_fp(stderr);
    abort();
}

RSA* generate_keypair() {
    RSA *rsa = RSA_new();
    BIGNUM *e = BN_new();

    if (!BN_set_word(e, PUBLIC_EXPONENT)) {
        handleErrors();
    }

    if (!RSA_generate_key_ex(rsa, KEY_LENGTH, e, NULL)) {
        handleErrors();
    }

    BN_free(e);
    return rsa;
}

char* save_public_key(RSA *rsa) {
    BIO *bio = BIO_new(BIO_s_mem());
    if (!PEM_write_bio_RSA_PUBKEY(bio, rsa)) {
        handleErrors();
    }

    char *public_key;
    long key_length = BIO_get_mem_data(bio, &public_key);
    char *key = (char*)malloc(key_length + 1);
    memcpy(key, public_key, key_length);
    key[key_length] = '\0';

    BIO_free_all(bio);
    return key;
}

char* save_private_key(RSA *rsa) {
    BIO *bio = BIO_new(BIO_s_mem());
    if (!PEM_write_bio_RSAPrivateKey(bio, rsa, NULL, NULL, 0, NULL, NULL)) {
        handleErrors();
    }

    char *private_key;
    long key_length = BIO_get_mem_data(bio, &private_key);
    char *key = (char*)malloc(key_length + 1);
    memcpy(key, private_key, key_length);
    key[key_length] = '\0';

    BIO_free_all(bio);
    return key;
}

RSA* load_private_key(const char *key) {
    BIO *bio = BIO_new_mem_buf((void*)key, -1);
    if (!bio) {
        handleErrors();
    }
    RSA *rsa = PEM_read_bio_RSAPrivateKey(bio, NULL, NULL, NULL);
    BIO_free(bio);
    return rsa;
}

int main(int argc, char *argv[]) {
    if (argc < 3) {
        fprintf(stderr, "Usage: %s <encrypt|decrypt> <message> [private_key]\n", argv[0]);
        exit(EXIT_FAILURE);
    }

    const char *mode = argv[1];
    const char *message = argv[2];

    OpenSSL_add_all_algorithms();
    ERR_load_BIO_strings();
    ERR_load_crypto_strings();

    if (strcmp(mode, "encrypt") == 0) {
        RSA *rsa = generate_keypair();

        char *public_key = save_public_key(rsa);
        char *private_key = save_private_key(rsa);

        unsigned char encrypted[KEY_LENGTH/8];
        int encrypted_length = RSA_public_encrypt(strlen(message), (unsigned char*)message, encrypted, rsa, PADDING);
        if (encrypted_length == -1) {
            handleErrors();
        }

        for (int i = 0; i < encrypted_length; i++) {
            printf("%02x", encrypted[i]);
        }
        printf("\n%s\n%s\n", public_key, private_key);

        free(public_key);
        free(private_key);
        RSA_free(rsa);
    } else if (strcmp(mode, "decrypt") == 0) {
        if (argc != 4) {
            fprintf(stderr, "Usage: %s decrypt <ciphertext> <private_key>\n", argv[0]);
            exit(EXIT_FAILURE);
        }
        const char *private_key_str = argv[3];
        RSA *private_key = load_private_key(private_key_str);

        int message_length = strlen(message) / 2;
        unsigned char encrypted[message_length];
        for (int i = 0; i < message_length; i++) {
            sscanf(message + 2 * i, "%2hhx", &encrypted[i]);
        }

        unsigned char decrypted[KEY_LENGTH/8];
        int decrypted_length = RSA_private_decrypt(message_length, encrypted, decrypted, private_key, PADDING);
        if (decrypted_length == -1) {
            handleErrors();
        }
        decrypted[decrypted_length] = '\0';

        printf("%s\n", decrypted);

        RSA_free(private_key);
    } else {
        fprintf(stderr, "Invalid mode: %s. Use 'encrypt' or 'decrypt'.\n", mode);
        exit(EXIT_FAILURE);
    }

    return 0;
}
