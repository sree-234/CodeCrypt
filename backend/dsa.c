#include <openssl/evp.h>
#include <openssl/pem.h>
#include <openssl/dsa.h>
#include <openssl/err.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

void handleErrors(void) {
    ERR_print_errors_fp(stderr);
    abort();
}

void generate_dsa_keys(DSA **dsa, char **private_key_str, char **public_key_str) {
    *dsa = DSA_new();
    if (DSA_generate_parameters_ex(*dsa, 1024, NULL, 0, NULL, NULL, NULL) != 1)
        handleErrors();
    if (DSA_generate_key(*dsa) != 1)
        handleErrors();

    BIO *bp_private = BIO_new(BIO_s_mem());
    BIO *bp_public = BIO_new(BIO_s_mem());

    if (!PEM_write_bio_DSAPrivateKey(bp_private, *dsa, NULL, NULL, 0, NULL, NULL))
        handleErrors();
    if (!PEM_write_bio_DSA_PUBKEY(bp_public, *dsa))
        handleErrors();

    long private_key_len = BIO_get_mem_data(bp_private, private_key_str);
    long public_key_len = BIO_get_mem_data(bp_public, public_key_str);

    *private_key_str = (char *)malloc(private_key_len + 1);
    *public_key_str = (char *)malloc(public_key_len + 1);

    BIO_read(bp_private, *private_key_str, private_key_len);
    (*private_key_str)[private_key_len] = '\0';

    BIO_read(bp_public, *public_key_str, public_key_len);
    (*public_key_str)[public_key_len] = '\0';

    BIO_free(bp_private);
    BIO_free(bp_public);
}

void dsa_sign(const char *msg, DSA *dsa, unsigned char **sig, unsigned int *sig_len) {
    *sig = malloc(DSA_size(dsa));
    if (DSA_sign(0, (unsigned char *)msg, strlen(msg), *sig, sig_len, dsa) != 1)
        handleErrors();
}

int dsa_verify(const char *msg, unsigned char *sig, unsigned int sig_len, DSA *dsa) {
    return DSA_verify(0, (unsigned char *)msg, strlen(msg), sig, sig_len, dsa);
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s [generate|sign|verify] [message|signature]\n", argv[0]);
        return 1;
    }

    DSA *dsa = NULL;
    char *private_key_str = NULL;
    char *public_key_str = NULL;

    if (strcmp(argv[1], "generate") == 0) {
        generate_dsa_keys(&dsa, &private_key_str, &public_key_str);

        printf("Private Key:\n%s\n", private_key_str);
        printf("Public Key:\n%s\n", public_key_str);

        free(private_key_str);
        free(public_key_str);
    } else if (strcmp(argv[1], "sign") == 0 && argc == 3) {
        const char *msg = argv[2];
        unsigned char *sig = NULL;
        unsigned int sig_len = 0;

        generate_dsa_keys(&dsa, &private_key_str, &public_key_str);
        dsa_sign(msg, dsa, &sig, &sig_len);

        printf("Signature:\n");
        for (unsigned int i = 0; i < sig_len; i++) {
            printf("%02x", sig[i]);
        }
        printf("\n");

        free(sig);
        free(private_key_str);
        free(public_key_str);
    } else if (strcmp(argv[1], "verify") == 0 && argc == 4) {
        const char *msg = argv[2];
        const char *hex_sig = argv[3];
        unsigned int sig_len = strlen(hex_sig) / 2;
        unsigned char *sig = malloc(sig_len);

        for (unsigned int i = 0; i < sig_len; i++) {
            sscanf(&hex_sig[2 * i], "%2hhx", &sig[i]);
        }

        generate_dsa_keys(&dsa, &private_key_str, &public_key_str);

        int ret = dsa_verify(msg, sig, sig_len, dsa);
        printf("%s\n", ret == 1 ? "Verified" : "Failed");

        free(sig);
        free(private_key_str);
        free(public_key_str);
    } else {
        fprintf(stderr, "Invalid command or parameters.\n");
        return 1;
    }

    if (dsa)
        DSA_free(dsa);

    return 0;
}
