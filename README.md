
# **CodeCrypt - The Ultimate Cryptography Simulation Tool with OpenSSL**

![Your Image Description](https://drive.google.com/uc?id=1AaUX_aB_QV9QRvU1AmK5MdY_JN6qU-ST)

[Website](https://codecrypt-b591f.web.app/) 

[Demo Video](https://youtu.be/T-Q9fzWl0Fg?si=fyER6HvYqaTSuO8f)

Welcome to our Cryptography Simulation project! Our tool allows you to effortlessly explore and experiment with various cryptographic techniques and thoroughly study them. Whether you want to understand encryption and decryption or delve into different algorithms, CodeCrypt has you covered.

## **🌟 Introduction**

This README provides an overview of the features, usage instructions, and contact information for our project. Read on to learn how you can easily simulate and understand cryptographic concepts with our intuitive platform.

## **🚀 Features**

CodeCrypt offers several convenient options for exploring cryptography:

1. **Algorithm Implementation:** Experiment with implementations of various cryptographic algorithms like RSA, AES, DES, and SHA using OpenSSL and c as backend.

2. **Interactive Encryption/Decryption:** Input data and select an encryption method, view the encrypted result, and decrypt it back to the original data.

3. **Different Data Types:** Experiment with Encryption, Decryption and key generation of text, file, audio, image and videos.
   
4. **Key Generation and Management:** Simulate cryptographic key generation, exchange, and management.
   
5. **User-Friendly Interface:** Enjoy an intuitive and user-friendly interface built with Vite and React.
   
6. **Educational Content:** Access interactive tutorials and educational content on fundamental security concepts like public/private keys, symmetric/asymmetric encryption, key derivation functions, digital signatures, and hash functions.

7. **User Interaction:** Experiment with different algorithms and different data types.

8. **Profile:** You can create profiles and update them.


## **🛠️ Technologies Used**

- **Frontend:** Vite, React
- **Backend:** C, OpenSSL, Firebase


## **📚 Application**

CodeCrypt is designed to provide an interactive and educational platform for understanding and experimenting with cryptographic techniques. It is particularly valuable for:

1. **Educational Purposes:** Helping students and professionals in the field of cybersecurity learn and understand cryptographic concepts through hands-on experimentation.

2. **Research and Development:** Assisting researchers and developers in testing and analyzing various cryptographic algorithms and techniques.

3. **Practical Demonstrations:** Enabling instructors and lecturers to demonstrate cryptographic principles in a classroom or training environment.

4. **Personal Experimentation:** Allowing enthusiasts and hobbyists to explore cryptography and enhance their knowledge in a practical, interactive manner.


## **🛠️ Getting Started**

To start using Cryptic Canvas, simply follow these steps:

1. **Visit our [Website](https://codecrypt-b591f.web.app/) .**

2. **Sign In**: To signin click on the [Signin](https://codecrypt-b591f.web.app/signin) button on the top right side.
   
3. **Sign Up**: If you are new then click on the [Join here](https://codecrypt-b591f.web.app/signup) button to signup.
   
4. **Explore**: You will be redirected to the [Study page](https://codecrypt-b591f.web.app/study) where you can select which algorithm you want to study like RSA, AES, DES, or SHA. It has in-depth information about Encryption, Decryption, and Key Generation of that particular algorithm along with YouTube videos.
   
5. **Encrypt/Decrypt**: To Encrypt and Decrypt using Codecrypt click on the [Encrypt](https://codecrypt-b591f.web.app/encrypt) or [Decrypt](https://codecrypt-b591f.web.app/decrypt) button.
    
6. In Encryption and Decryption, you can choose from 5 different types of data encryption and decryption which are text, file, audio, image, and video.
    
7. Then select what type of algorithm to use, AES, RSA, DES, or SHA.
    
8. Copy the parameters from the encrypted page and send them to your friend for him to try.
    
9. Or use the parameters to find the Encrypted Data.

## **💻 How to Set Up Locally**



### **Requirements**
- **Firebase**
- **Node.js and npm**
- **Windows/Linux**
- **Vite**
- **OpenSSL library**
- **A C compiler (e.g., GCC)**

### **Installation Steps**

#### **Install OpenSSL**

- Windows:
1. Download from : [OpenSSL](https://www.openssl.org/source/)
2. Extract the file
3. Place the extracted OpenSSL file in ```C:\Program Files```

- Ubuntu/Linux:
1. Open Terminal
2. Update the Package Lists
   ```bash
   sudo apt update
   ```
3. Install OpenSSL
   ```bash
   sudo apt install openssl
   ```
4. Verify the Installation
   ```bash
   openssl version
   ```
5. Install Development Libraries
   ```bash
   sudo apt install libssl-dev
   ```

#### **Install GCC**

- Windows:
1. Download MinGW from : [GCC](https://sourceforge.net/projects/gcc-win64/)
2. Install MinGW 
3. Set Environment Variables
4. Verify Installation
   ```bash
   gcc --version
   ```

- Ubuntu/Linux:
1. Open Terminal
2. Update the Package Lists
   ```bash
   sudo apt update
   ```
3. Install GCC
   ```bash
   sudo apt install gcc
   ```
4. Verify the Installation
   ```bash
   gcc --version
   ```
5. Install Additional Tools 
   ```bash
   sudo apt install build-essential
   ```

The next steps are the same for all OS:

**Do not Skip any steps**

### Firebase
- Tables
  - users
    1. userId (String)
    2. email (String)
    3. username (String)
    4. bio (String)
    5. profilePictureUrl (String)
    6. completedAlgorithms(map)
       - AES(boolean)
       - DES(boolean)
       - RSA(boolean)
       - SHA(boolean)
    7. progress(map)
       - AES(number)
       - DES(number)
       - RSA(number)
       - SHA(number)

1. **Clone the Repo:**
   To get started with CodeCrypt, clone the repository to your local machine using the following command:
   ```bash
   git clone https://github.com/Aaron-Thomas-Blessen/CodeCrypt.git
   cd CodeCrypt
   ```

2. **Install Dependencies:**
   Navigate to the `frontend` folder and install the frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. **Build the Backend:**
   Navigate to the `backend` folder and build the backend:
   ```bash
   cd ../backend
   ```

4. **Run Locally:**
   To run the CodeCrypt application locally, open a terminal and start the backend server:
   ```bash
   node server.js
   ```
   Then, start the frontend development server in another terminal:
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open in Browser:**
   Open the application in your browser by navigating to [http://localhost:5173/](http://localhost:5173/).

   

## **📋 Usage**

To start experimenting with cryptography:

1. **Select an Algorithm:** Choose a cryptographic algorithm from the available options.
   
3. **Input Data:** Enter the text or data you want to encrypt or decrypt.
   
5. **Generate Keys:** Cryptographic keys are automatically generated if required by the chosen algorithm.
   
7. **Encrypt/Decrypt:** Perform encryption or decryption and view the results.
   
9. **Explore Concepts:** Access tutorials and educational content to learn more about cryptographic principles and techniques.
    
11. **Sign Up**: Create an account and save your progress.

## 🛠️**Developers**

This was Developed by 
- **[Aaron Thomas Blessen](https://www.linkedin.com/in/aaron-thomas-blessen-390200214/)**
- **[Sreejith A](https://github.com/sree-234)**
- **[Midhun Sreenivas](https://github.com/Midhun700)**
  
  
## **💬 Feedback**

We're constantly striving to improve CodeCrypt to provide the best possible experience for our users. If you have any feedback, or suggestions, or encounter any issues while using our platform, please don't hesitate to contact us. Your input is invaluable in helping us enhance our product and deliver exceptional results.


