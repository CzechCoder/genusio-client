import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import titleBanner from "../img/title_banner.jpg";
import testimony_gab from "../img/testimon_gab.png";
import testimony_tom from "../img/testimon_tom.png";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SellOutlined from "@mui/icons-material/SellOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {/* Welcome section */}
      <section id="welcome" className="showcase skewy">
        <div className="mid-container">
          <div className="w-textwrapper container-ft">
            <h1><span></span> HODNOTNÉ KOMUNITY!</h1>
            <p>VŠE NA JEDNOM MÍSTĚ</p>
            <a href="/signup" className="btn">
              ZAČÍT
            </a>
          </div>

          <div className="color-overlay"></div>
        </div>
      </section>

      {/* Title section */}
      <section id="title" style={{ color: "black" }}>
        <div className="c-container">
          <h1>MODERNÍ TRŽIŠTĚ S KOMUNITAMI!</h1>
          <div className="grid">
            <div className="showcase-text">
              <div className="title-text">
                <h2>Najděte přesně to, co hledáte!</h2>
                <p>
                  Hledáte sponzora pro svoji komunitu? Nebo se naopak rozhlížíte
                  po komunitě, která by byla Vaším skvělým obchodním partnerem?
                  Genusio Vám umožní najít přesně to, co hledáte, ať chcete
                  koupit, prodat, sponzorovat, nebo objevovat hodnotné komunity!
                </p>
                <h2>Tržiště budoucnosti na dosah ruky!</h2>
                <p>
                  Díky sofistikovaným nástrojům a dlouholetému know-how Genusio
                  umožňuje snadné, rychlé a efektivní propojení nabídky a
                  poptávky na poli komunitního trhu. Stačí se zaregistrovat a
                  můžete začít. Jako leader můžete snadno přidat Vaši komunitu
                  do katalogu a jako sponzor / kupec můžete okamžitě začít
                  vyhledávat, porovnávat, komunikovat a najít tu správnou
                  komunitu pro Vaše potřeby.
                </p>
                <a href="/signup" className="btn">
                  Zjistit víc
                </a>
              </div>
            </div>

            <div className="showcase-form">
              <img src={titleBanner} alt="Banner" />
            </div>
          </div>
        </div>
      </section>
      {/* Cards section */}
      <section
        id="cards"
        className="bg-primary skewy"
        style={{ minHeight: "300px" }}
      >
        <div className="container grid grid-4 anti-skewy">
          <div className="card flex">
            <i>
              <SellOutlined fontSize="large" className="big-icon" />
            </i>
            <h3>Prodávej</h3>
            <p>
              Rádi byste monetizovali svoji komunitu a možná ji i předali do
              nových rukou? Umístěte svoji komunitu přesně tam, kde je po ní
              poptávka.
            </p>
          </div>
          <div className="card flex">
            <i>
              <ShoppingCartOutlinedIcon fontSize="large" className="big-icon" />
            </i>
            <h3>Kupuj</h3>
            <p>
              Snadno a rychle najděte Vaši vytouženou komunitu, která sedne
              Vašim potřebám a hlavně je k prodeji. Toto tržiště je otevřeno 24
              hodin denně.
            </p>
          </div>
          <div className="card flex">
            <i>
              <FavoriteBorderOutlinedIcon
                fontSize="large"
                className="big-icon"
              />
            </i>
            <h3>Sponzoruj</h3>
            <p>
              Není potřeba každou komunitu kupovat. Přenechte vedení komunity
              leaderovi a vzájemně prosperujte díky Vašemu sponzoringu.
            </p>
          </div>
          <div className="card flex">
            <i>
              <SearchOutlinedIcon fontSize="large" className="big-icon" />
            </i>
            <h3>Najdi</h3>
            <p>
              Toužíte přidat se do komunity vyznávající stejné hodnoty? Genusio
              obsahuje i komunity, které na sociálních sítích nenajdete. Mějte
              širší výběr.
            </p>
          </div>
        </div>
      </section>
      {/* Testimonials section */}
      <section id="testimonials" style={{ minHeight: "300px" }}>
        <div className="c-container">
          <h2 style={{ textAlign: "center" }}>DĚLÁME NAŠIM KLIENTŮM RADOST</h2>

          <div className="testimony-card">
            <div className="t-card-inner">
              <div className="t-card-pic">
                <img src={testimony_gab} alt="testimony"/>
              </div>
              <div className="showcase-text">
                <p style={{ fontWeight: "bold", marginBottom: "20px" }}>
                  DŮLEŽITÉ PRO RŮST KOMUNITY!
                </p>
                <p>
                  "Hledala jsem nástoj, který by mi pomohl propagovat moji
                  komunitu tak, aby i širší základna podnikatelů mohla
                  profitovat z bynzysového networkingu. Genusio tento úkol
                  splnilo na 100%!"
                </p>
                <p>
                  - <b>Gabriela Mrkvicová</b> - Business Club Smart Network
                </p>
              </div>
            </div>
          </div>
          <div className="testimony-card">
            <div className="t-card-inner">
              <div className="t-card-pic">
                <img src={testimony_tom} alt="testimony"/>
              </div>
              <div className="showcase-text">
                <p style={{ fontWeight: "bold", marginBottom: "20px" }}>
                  JEDNODUCHÉ V KAŽDÉM SMĚRU!
                </p>
                <p>
                  "Dříve jsem marně hledal efektivní způsob, jakým monetizovat
                  svoji komunitu. Genusio mi poskytuje všechny nástroje, které
                  potřebuji k jednoduché správě členství a monetizace, vše na
                  jednom místě."
                </p>
                <p>
                  - <b>Tomáš Havrda</b> - Rodina svobodně-podnikajících lidí ICA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Wuwej section */}
      <section id="wuwej" className="bg-primary" style={{ minHeight: "300px" }}>
        <div className="c-container">
          <div className="wuwej-card">
            <div className="w-card-inner">
              <div className="showcase-text">
                <h1>My jsme Wuwej!</h1>
                <p>
                  Již od roku 2018 budujeme a rozvíjíme komunitní trh. Naší vizí
                  je svět, kde lze snadno propojit leadery komunit nejen s
                  novými potenciálními členy, ale také s případnými kupci, či
                  sponzory. Naše platforma jako jediná toto umožňuje!
                </p>
                <p>Chcete vědět víc?</p>
                <a href="mailto:jakub@pacanda.cz" className="btn">
                  Kontaktujte nás!
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
