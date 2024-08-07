import Navbar from "../components/nav";
import crypto from "../images/cryptography.png";
import rsa from "../images/rsa-icon.png";
import aes from "../images/aes-icon.png";
import sha from "../images/sha-icon.png";
import des from "../images/des-icon.png";
import crypto1 from "../images/cryptography1.png";
import crypto2 from "../images/cryptography2.png";

const Home = () => {
  const TwoColumnSection = () => {
    return (
      <div className="flex flex-wrap justify-between items-center mb-20 mt-20 p-5 lg:pl-20">
        <div className="w-full md:w-1/2 lg:w-auto lg:flex-1 lg:pr-10">
          <h4 className="text-2xl font-bold mb-4">Explore</h4>
          <h1 className="text-4xl font-bold mb-6">
            Cryptography Simulation
            <br />
            Learn and Experiment
          </h1>
          <div className="btn flex">
            <button className="px-8 py-4 bg-black text-white rounded-lg mr-4">
              <a href="/study">Study</a>
            </button>
            <button className="px-8 py-4 bg-white border-2 border-blue-gray-700 text-black rounded-lg hover:bg-gray-200 ml-4">
              <a href="/encrypt">Encrypt</a>
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-auto lg:flex-1 lg:pl-10 mt-8 lg:mt-0">
          <ul>
            <li className="mb-4">
              <div className="flex">
                <h2 className="text-lg font-bold mb-2">Step 1</h2>
              </div>
              <p className="ml-10">
                Input text or data and select a cryptographic method.
              </p>
            </li>
            <li className="mb-4">
              <div className="flex">
                <h2 className="text-lg font-bold mb-2">Step 2</h2>
              </div>
              <p className="ml-10">
                View the encrypted result and understand the process.
              </p>
            </li>
            <li className="mb-4">
              <div className="flex">
                <h2 className="text-lg font-bold mb-2">Step 3</h2>
              </div>
              <p className="ml-10">
                Decrypt the data back to its original form.
              </p>
            </li>
            <li className="mb-4">
              <div className="flex">
                <h2 className="text-lg font-bold mb-2">Step 4</h2>
              </div>
              <p className="ml-10">
                Experiment with key generation and management.
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const Two = () => {
    return (
      <div className="home">
        <div className="flex flex-col lg:flex-row items-center justify-center mb-16">
          <div className="lg:w-1/2 lg:pl-4 p-10 ml-6">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold mb-4 text-center">
                Interactive Cryptography Learning Tool
              </h1>
            </div>

            <div className="text-center lg:py-8 mb-4">
              <p>
                Our tool allows you to explore various cryptographic techniques,
                providing hands-on experience with encryption, decryption, key
                generation, and more.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row justify-between px-4 lg:px-0">
              <div className="lg:w-1/2 lg:pr-4 mb-8 lg:mb-0">
                <h4 className="text-xl font-bold mb-4">Educational Value</h4>
                <p>
                  Learn fundamental security concepts through interactive
                  tutorials and simulations.
                </p>
              </div>
              <div className="lg:w-1/2 lg:pl-4">
                <h4 className="text-xl font-bold mb-4">Practical Experience</h4>
                <p>
                  Gain practical skills by experimenting with real cryptographic
                  algorithms and techniques.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 lg:pr-4">
            <img
              className="cryptography-img lg:float-right"
              src={crypto}
              alt="Cryptography Simulation"
            />
          </div>
        </div>

        <section id="discover-cryptographic-techniques" className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-8">
                Discover Cryptographic Techniques
              </h1>
              <p className="text-base text-gray-700 mb-8">
                Our platform covers a wide range of cryptographic algorithms
                including RSA, AES, DES, and SHA. Each method is thoroughly
                explained and demonstrated, allowing you to gain a deep
                understanding of how cryptography secures digital communication.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-1">
                <div className="text-center">
                  <img
                    className="mx-auto mb-2 w-8 h-auto"
                    src={rsa}
                    alt="RSA Icon"
                  />
                  <h4 className="text-lg font-semibold mb-2">RSA Algorithm</h4>
                  <p>
                    Explore the RSA algorithm for secure data encryption and
                    decryption using public and private keys.
                  </p>
                </div>
                <div className="text-center mt-8">
                  <img
                    className="mx-auto mb-2 w-8 h-auto"
                    src={aes}
                    alt="AES Icon"
                  />
                  <h4 className="text-lg font-semibold mb-2">AES Encryption</h4>
                  <p>
                    Learn about AES encryption and how it ensures the
                    confidentiality of your data.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="text-center">
                  <img
                    className="mx-auto mb-4"
                    src={crypto1}
                    alt="Cryptography"
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="text-center">
                  <img
                    className="mx-auto mb-2 w-8 h-auto"
                    src={sha}
                    alt="SHA Icon"
                  />
                  <h4 className="text-lg font-semibold mb-2">SHA Hashing</h4>
                  <p>
                    Understand how SHA hashing ensures data integrity by
                    generating unique hash values.
                  </p>
                </div>
                <div className="text-center mt-8">
                  <img
                    className="mx-auto mb-2 w-8 h-auto"
                    src={des}
                    alt="DES Icon"
                  />
                  <h4 className="text-lg font-semibold mb-2">DES Algorithm</h4>
                  <p>
                    Delve into the DES algorithm and its role in the history of
                    cryptographic methods.
                  </p>
                </div>
              </div>
            </div>
            <div className="button-container1 flex justify-center py-8">
              <div className="mx-4">
                <button className="signup px-6 py-3 bg-white border-2 border-blue-gray-700 text-black rounded-lg hover:bg-gray-200">
                  <a href="/encrypt">Explore</a>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:mr-8 mb-8 lg:mb-0">
          <div className="mid-page-signup lg:ml-10 py-6 lg:w-1/2 lg:pr-8">
            <div className="text-container1 text-center lg:text-left">
              <h1 className="text-4xl font-bold mb-4">
                Interactive Cryptography Learning
              </h1>
              <div className="py-4">
                <p>
                  Connect with the intricacies of cryptography and enhance your
                  knowledge.
                </p>
              </div>
              <div className="button-container2 flex justify-center lg:justify-start">
                <div className="mx-4">
                  <button className="login1 px-6 py-3 bg-white border-2 border-blue-gray-700 text-black rounded-lg hover:bg-gray-200">
                    <a href="/study">Learn More</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <img
            className="cryptography-img mb-4 lg:mb-0"
            alt="Cryptography Learning"
            src={crypto2}
          />
        </div>
        <hr className="border-t-2 border-gray-300 my-2" />

        <div className="footer flex ml-2 mr-2 flex-wrap justify-between items-center mb-2">
          <div className="w-full lg:w-auto">
            <h6>© 2024 CodeCrypt All rights reserved.</h6>
          </div>
          <div className="flex flex-wrap">
            <h6 className="mr-4">Privacy Policy</h6>
            <h6 className="mr-4">Terms of Service</h6>
            <h6>Cookies Settings</h6>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <TwoColumnSection />
      <Two />
    </div>
  );
};

export default Home;
