import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

function Footer(){
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    // idcka z emailjs
    const serviceID = "service_2re0z7k";
    const templateID = "template_wjikvap";
    const userID = "Mlnv3k6NanjelxcNQ";
    
    function posliEmail(event) {
        event.preventDefault();

        if (document.getElementById('input').value === "") {
            alert("Please enter your email");
            return;
        } else {
            alert("Thank you for subscribing to our newsletter!");
        }

        setButtonDisabled(true); // zablokuje tlacidlo, aby mi nedoslo 1000000emailov :3
    
        emailjs.sendForm(serviceID, templateID, '#form', userID)
            .then((result) => {
                console.log(result.text);

            }, (error) => {
                console.log(error.text);
                setButtonDisabled(false);
            });
    }

    return (
        <footer className="bg-black text-white">
      <hr className="border-t-2 border-MojaZlta" />
      <div className="container mx-auto px-4 py-8 flex flex-wrap justify-between items-center">
        <div className="w-full md:w-1/2"> {/* Responsive form container */}
          <form className="rounded p-5" id="form" onSubmit={posliEmail}>
            <label className="text-2xl block">Subscribe to our newsletter</label>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="block mr-2 text-black"
                id="input"
              />
              <button
                id="buttonik"
                className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded disabled:opacity-50"
                disabled={isButtonDisabled}
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 flex flex-wrap justify-center md:justify-end"> {/* Responsive link container */}
          <table className="hidden md:table"> {/* Hide table on small screens */}
            <tbody>
              <tr>
                <td className="px-3 py-1 hover:text-gray-300">
                  <a href="">Contact</a>
                </td>
                <td className="px-3 py-1 hover:text-gray-300">
                  <a href="">FAQ</a>
                </td>
                <td className="px-3 py-1 hover:text-gray-300">
                  <a href="">Terms of Service</a>
                </td>
                <td className="px-3 py-1 hover:text-gray-300">
                  <a href="">Privacy and Policy</a>
                </td>
                <td className="px-3 py-1 hover:text-gray-300">
                  <a href="https://github.com/PravyKralSlovenska/Web-SpotifyAPI">
                    Contributing, Github
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-wrap justify-center md:hidden"> {/* Links for small screens */}
            <a href="" className="px-3 py-1 block hover:text-gray-300">
              Contact
            </a>
            <a href="" className="px-3 py-1 block hover:text-gray-300">
              FAQ
            </a>
            <a href="" className="px-3 py-1 block hover:text-gray-300">
              Terms of Service
            </a>
            <a href="" className="px-3 py-1 block hover:text-gray-300">
              Privacy and Policy
            </a>
            <a
              href="https://github.com/PravyKralSlovenska/Web-SpotifyAPI"
              className="px-3 py-1 block hover:text-gray-300"
            >
              Contributing, Github
            </a>
          </div>
        </div>
      </div>
      <p className="text-center py-4">© {new Date().getFullYear()} fenomenalny cigansky kral</p>
    </footer>
    );
}

export default Footer;
