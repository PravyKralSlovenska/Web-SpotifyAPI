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
        <footer className="bg-black">
            <hr className="border-t-2 border-MojaZlta" />
            <div className="flex justify-center">
                <div className="flex m-2">
                    <form className="rounded p-5 mr-4" id="form" onSubmit={posliEmail}>
                        <label className="text-2xl block">Subscribe to our newsletter</label>
                        <div className="flex">
                            <input type="email" placeholder="Enter your email" className="block mr-2 text-black" id="input"></input>
                            <button id="buttonik" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded" disabled={isButtonDisabled}>Subscribe</button>
                        </div>
                    </form>
                </div>
                <div className="flex mt-8 justify-center">
                    <table className="justify-center">
                        <tbody>
                            <td className="px-7"><a href="">Contact</a></td>
                            <td className="px-7"><a href="">FAQ</a></td>
                            <td className="px-7"><a href="">Terms of Service</a></td>
                            <td className="px-7"><a href="">Privacy and Policy</a></td>
                            <td className="px-7"><a href="https://github.com/PravyKralSlovenska/Web-SpotifyAPI">Contributing, Github</a></td>
                        </tbody>
                    </table>
                </div>
            </div>
            <p className="text-center">© {new Date().getFullYear()} fenomenalny cigansky kral</p>
        </footer>
    );
}

export default Footer;
