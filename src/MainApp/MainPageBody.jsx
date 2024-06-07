function MainPageBody() {

    var zoznam = ["zeny v monterkaj to je to moje vytuzene","prestan masturbovat doma a najdi si nejaku kurvu na ...","Jozko Vajda odporuca","novy zazrak na Vahu, cigani ujebali priehradu",
                  "Gaj","jebnuty react uz od roku 2024","obrovsky shoutout random porno strankam lebo bez nich by som tu asi uz nebol :3","ZOCHOVA PRIZNANIA CERTIFIED","Michal Augustin disstrack droppin next week",
                  "skibidi sigma rizz ong fr ishowspeed fanum tax baby grunk? oh my gawwd ohio blud jung","jebnuty javascript uz od roku 0","AH - ,,jebe, mega stranka'', Berlin 1945","grrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
                  "gogo vs robo fico oktagon kedy?","mato skulsky pozor zitra","Bonjour :3"]

    return (
        <div className="text-center relative flex-1 overflow-y-auto">
            <img className="w-screen blur-lg" src="./public/KanyeWestConcert.png" alt="concert" />
            <div className="absolute top-0 left-0 right-0 bottom-80 flex items-center justify-center">
                <h1 className="text-4xl font-Aeonik-bold bg-gradient-to-r from-MojaRuzova to-MojaZlta
                 hover:from-MojaZlta hover:to-MojaRuzova text-transparent bg-clip-text cursor-pointer duration-200">{zoznam[Math.floor(Math.random() * zoznam.length)]}</h1>
            </div>
        </div>
    );
}

export default MainPageBody;
