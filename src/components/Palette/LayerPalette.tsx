import { ActivationType, LayerNodeModel, LayerType } from "../../node/LayerNodeModel";
import { useCanvasStore } from "../../store/CanvasStore";
import { ItemWrap } from "./ItemWrap";

const NodeSVG = (
  <svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="34.392px" 
  height="18.096px" 
  viewBox="0 -750 1900 1000" 
  xmlnsXlink="http://www.w3.org/1999/xlink" 
  aria-hidden="true" 
  >
    <defs>
      <path 
        id="MJX-7-TEX-I-1D453" 
        d="M118 -162Q120 -162 124 -164T135 -167T147 -168Q160 -168 171 -155T187 -126Q197 -99 221 27T267 267T289 382V385H242Q195 385 192 387Q188 390 188 397L195 425Q197 430 203 430T250 431Q298 431 298 432Q298 434 307 482T319 540Q356 705 465 705Q502 703 526 683T550 630Q550 594 529 578T487 561Q443 561 443 603Q443 622 454 636T478 657L487 662Q471 668 457 668Q445 668 434 658T419 630Q412 601 403 552T387 469T380 433Q380 431 435 431Q480 431 487 430T498 424Q499 420 496 407T491 391Q489 386 482 386T428 385H372L349 263Q301 15 282 -47Q255 -132 212 -173Q175 -205 139 -205Q107 -205 81 -186T55 -132Q55 -95 76 -78T118 -61Q162 -61 162 -103Q162 -122 151 -136T127 -157L118 -162Z"
      >
      </path>
      <path 
        id="MJX-7-TEX-N-28" 
        d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z"></path><path id="MJX-7-TEX-I-1D465" d="M52 289Q59 331 106 386T222 442Q257 442 286 424T329 379Q371 442 430 442Q467 442 494 420T522 361Q522 332 508 314T481 292T458 288Q439 288 427 299T415 328Q415 374 465 391Q454 404 425 404Q412 404 406 402Q368 386 350 336Q290 115 290 78Q290 50 306 38T341 26Q378 26 414 59T463 140Q466 150 469 151T485 153H489Q504 153 504 145Q504 144 502 134Q486 77 440 33T333 -11Q263 -11 227 52Q186 -10 133 -10H127Q78 -10 57 16T35 71Q35 103 54 123T99 143Q142 143 142 101Q142 81 130 66T107 46T94 41L91 40Q91 39 97 36T113 29T132 26Q168 26 194 71Q203 87 217 139T245 247T261 313Q266 340 266 352Q266 380 251 392T217 404Q177 404 142 372T93 290Q91 281 88 280T72 278H58Q52 284 52 289Z"></path><path id="MJX-7-TEX-N-29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z"
      >
      </path></defs>
      <g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)">
        <g data-mml-node="math"><g data-mml-node="mi">
          <use data-c="1D453" xlinkHref="#MJX-7-TEX-I-1D453">
          </use>
        </g>
        <g data-mml-node="mo" transform="translate(550,0)">
          <use data-c="28" xlinkHref="#MJX-7-TEX-N-28">
          </use>
        </g>
        <g data-mml-node="mi" transform="translate(939,0)">
          <use data-c="1D465" xlinkHref="#MJX-7-TEX-I-1D465">
          </use>
        </g>
        <g data-mml-node="mo" transform="translate(1511,0)">
          <use data-c="29" xlinkHref="#MJX-7-TEX-N-29">
          </use>
        </g>
      </g>
      </g>
  </svg>
  // From : https://viereck.ch/latex-to-svg/
);

  // Original SVG -> Delete if we don't need this.
  // <svg
  //   width="26"
  //   height="26"
  //   viewBox="0 0 26 26"
  //   fill="none"
  //   xmlns="http://www.w3.org/2000/svg"
  // >
  //   <path d="M1 25V1H25V25H1Z" stroke="#D9D9D9" />
  // </svg>


export default function LayerPalette() {
  const engine = useCanvasStore((state) => (state.engine));
  const addNode = useCanvasStore((state) => state.addNode);

  const handleClick = () => {
    addNode(new LayerNodeModel({
      "activation":ActivationType.SIGMOID,
      "inputNum":3,
      "outputNum":3,
      "type":LayerType.LINEAR,
      "name":"linear"
    }));
    engine.getEngine().repaintCanvas();
  }

  return <ItemWrap onClick={handleClick}>
    {NodeSVG}
  </ItemWrap>
}