function MainPageBody() {
    var zoznam = [
        "Ak zomriem dajte moj majetok jehovistom. A Miso bude hlava rodiny.",
        "Profesor Ludo Kolman pod hrozbou utratenia vsetkych zidov prekonvertoval na Islam a pan Pipik bol nahradeny jednym velmi zaujimavym profesorom.",
        "stale tomu aj tak neviem pochopit, jak ste sa mohli v Patinciach vyjebat do vane s kyselinou",
        "povedz mi teda Dano v com si dobry! umm no neviem.. celkom rad odpisujem vodomery. Hahah tak to ti je totalne napicu",
        "Peder? ano? Samo Chalupka mor ho prve 4 slohy na znamku",
        "Ta otravim kyanidom aby si skapal do rana ty turbokokot",
        "Kung-Pao nemame ty sikmooke monstrum",
      ];      
  
    return (
        <div className="flex-1 overflow-y-auto text-center relative min-h-screen">
            <img className="w-full blur-lg" src="./public/KanyeWestConcert.png" alt="concert" />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <h1 className="m-8 font-sans text-2xl sm:text-4xl font-Aeonik-bold bg-gradient-to-r from-MojaRuzova to-MojaZlta hover:from-MojaZlta hover:to-MojaRuzova text-transparent bg-clip-text cursor-pointer duration-200">
                {zoznam[Math.floor(Math.random() * zoznam.length)]}
            </h1>
            </div>
      </div>
    );
  }
  
  export default MainPageBody;
  