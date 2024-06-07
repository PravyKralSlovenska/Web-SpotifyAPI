function Footer(){
    return (
        <footer className="bg-black">
            <hr className="border-t-2 border-MojaZlta" />
            <div className="flex justify-center">
                <div className="flex m-2">
                    <form className="rounded p-5 mr-4">
                        <label className="text-2xl block">Subscribe to our newsletter</label>
                        <div className="flex">
                            <input type="email" placeholder="Enter your email" className="block mr-2 text-black"></input>
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
