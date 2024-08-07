#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <openssl/sha.h>

// Function to convert binary hash to hexadecimal string
void hash_to_hex(unsigned char hash[SHA256_DIGEST_LENGTH], char outputBuffer[65]) {
    for (int i = 0; i < SHA256_DIGEST_LENGTH; i++) {
        sprintf(outputBuffer + (i * 2), "%02x", hash[i]);
    }
    outputBuffer[64] = 0; // Null-terminate the string
}

// Function to compute SHA-256 hash of a string
void compute_sha256(const char *str, char outputBuffer[65]) {
    unsigned char hash[SHA256_DIGEST_LENGTH];
    SHA256_CTX sha256;
    SHA256_Init(&sha256);
    SHA256_Update(&sha256, str, strlen(str));
    SHA256_Final(hash, &sha256);
    hash_to_hex(hash, outputBuffer);
}

// Function to verify SHA-256 hash of a string
int verify_sha256(const char *str, const char *expected_hash) {
    char computed_hash[65];
    compute_sha256(str, computed_hash);
    return strcmp(computed_hash, expected_hash) == 0;
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <input_string> [<expected_hash>]\n", argv[0]);
        return 1;
    }

    const char *input_string = argv[1];
    char hash_output[65];

    compute_sha256(input_string, hash_output);

    if (argc == 2) {
        // Only generate hash
        printf("SHA-256 hash: %s\n", hash_output);
    } else if (argc == 3) {
        // Generate and verify hash
        const char *expected_hash = argv[2];
        if (verify_sha256(input_string, expected_hash)) {
            printf("Hash verified successfully. The input matches the expected hash.\n");
        } else {
            printf("Hash verification failed. The input does not match the expected hash.\n");
        }
    } else {
        fprintf(stderr, "Usage: %s <input_string> [<expected_hash>]\n", argv[0]);
        return 1;
    }

    return 0;
}
