function Footer(){

    // nefunguje
    // try {
    //     document.getElementById('form').addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         const input = document.getElementById('input');
    //         if (input.value === '') {
    //             alert('Please enter your email');
    //         } else {
    //             alert('Thank you for subscribing');
    //             document.getElementById('form').reset();
    //         }
    //     });

    //     // function sendEmail() {
    //     //     Email.send({
    //     //         Host: "smtp.gmail.com",
    //     //         Username: "sender@email_address.com",
    //     //         Password: "Enter your password",
    //     //         To: 'receiver@email_address.com',
    //     //         From: "sender@email_address.com",
    //     //         Subject: "Sending Email using javascript",
    //     //         Body: "Well that was easy!!",
    //     //     })
    //     //         .then(function (message) {
    //     //             alert("mail sent successfully")
    //     //         });
    //     // }
    // }
    // catch (e) {
    //     console.error('Failed to add event listener to form', e);
    // }

    return (
        <footer className="bg-black">
            <hr className="border-t-2 border-MojaZlta" />
            <div className="flex justify-center">
                <div className="flex m-2">
                    <form className="rounded p-5 mr-4" id="form">
                        <label className="text-2xl block">Subscribe to our newsletter</label>
                        <div className="flex">
                            <input type="email" placeholder="Enter your email" className="block mr-2 text-black" id="input"></input>
                            <button className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">Subscribe</button>
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
                            <td className="px-7"><a href="">Contributing, Github</a></td>
                        </tbody>
                    </table>
                </div>
            </div>
            <p className="text-center">© {new Date().getFullYear()} fenomenalny cigansky kral</p>
        </footer>
    );
}

export default Footer;
