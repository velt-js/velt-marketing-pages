// 43 customer logos rendered on /customers (Figma node 536:8693, content
// pulled from velt.dev/customers' Framer source). Order in this array
// drives display order: left→right, top→bottom across the 3-col grid.
// Each entry carries the customer's site URL so the grid cell can wrap
// in an external <a target="_blank">. logoWidth / logoHeight are the
// intrinsic dimensions of the source PNG — the browser uses them to
// compute the contain-aspect before the image decodes (no layout flash).

export type CustomerLogoEntry = {
  name: string;
  /** External site URL — opens in a new tab. */
  href: string;
  /** Path under public/. */
  logoSrc: string;
  /** Intrinsic pixel dimensions from the source PNG. */
  logoWidth: number;
  logoHeight: number;
};

const BASE = "/images/customers";

export const customerLogos: CustomerLogoEntry[] = [
  // Row 1
  { name: "Google", href: "https://google.com", logoSrc: `${BASE}/google.png`, logoWidth: 2401, logoHeight: 753 },
  { name: "Pendo", href: "https://www.pendo.io/", logoSrc: `${BASE}/pendo.png`, logoWidth: 326, logoHeight: 90 },
  { name: "Varonis", href: "https://www.varonis.com/", logoSrc: `${BASE}/varonis.png`, logoWidth: 361, logoHeight: 60 },
  // Row 2
  { name: "HeyGen", href: "https://www.heygen.com/", logoSrc: `${BASE}/heygen.png`, logoWidth: 310, logoHeight: 104 },
  { name: "Flyr", href: "https://flyr.com/", logoSrc: `${BASE}/flyr.png`, logoWidth: 656, logoHeight: 160 },
  { name: "Bigtincan", href: "https://www.bigtincan.com/", logoSrc: `${BASE}/bigtincan.png`, logoWidth: 334, logoHeight: 98 },
  // Row 3
  { name: "Ziff Davis", href: "https://www.ziffdavis.com/", logoSrc: `${BASE}/ziffdavis.png`, logoWidth: 598, logoHeight: 350 },
  { name: "Runway", href: "https://runway.com/", logoSrc: `${BASE}/runway.png`, logoWidth: 252, logoHeight: 51 },
  { name: "LambdaTest", href: "https://www.lambdatest.com/", logoSrc: `${BASE}/lambdatest.png`, logoWidth: 322, logoHeight: 76 },
  // Row 4
  { name: "Datarails", href: "https://www.datarails.com/", logoSrc: `${BASE}/datarails.png`, logoWidth: 339, logoHeight: 90 },
  { name: "FireHydrant", href: "https://firehydrant.com/", logoSrc: `${BASE}/firehydrant.png`, logoWidth: 460, logoHeight: 124 },
  { name: "Leadpages", href: "https://www.leadpages.com/", logoSrc: `${BASE}/leadpages.png`, logoWidth: 560, logoHeight: 168 },
  { name: "Qloo", href: "https://qloo.com/", logoSrc: `${BASE}/qloo.png`, logoWidth: 300, logoHeight: 131 },
  // Row 5
  { name: "MetaImpact", href: "https://metaimpact.com/", logoSrc: `${BASE}/metaimpact.png`, logoWidth: 456, logoHeight: 102 },
  { name: "L-Acoustics", href: "https://www.l-acoustics.com/", logoSrc: `${BASE}/lacoustics.png`, logoWidth: 900, logoHeight: 82 },
  { name: "CloudFactory", href: "https://www.cloudfactory.com/", logoSrc: `${BASE}/cloudfactory.png`, logoWidth: 1000, logoHeight: 186 },
  // Row 6
  { name: "Trumpet", href: "https://trumpet.app/", logoSrc: `${BASE}/trumpet.png`, logoWidth: 284, logoHeight: 48 },
  { name: "Vareto", href: "https://www.vareto.com/", logoSrc: `${BASE}/vareto.png`, logoWidth: 442, logoHeight: 82 },
  { name: "SafetyKit", href: "https://www.safetykit.com/", logoSrc: `${BASE}/safetykit.png`, logoWidth: 320, logoHeight: 64 },
  // Row 7
  { name: "Colossyan", href: "https://www.colossyan.com/", logoSrc: `${BASE}/colossyan.png`, logoWidth: 398, logoHeight: 82 },
  { name: "ClassWallet", href: "https://classwallet.com/", logoSrc: `${BASE}/classwallet.png`, logoWidth: 1000, logoHeight: 160 },
  { name: "Vellum AI", href: "https://www.vellum.ai/", logoSrc: `${BASE}/vellum.png`, logoWidth: 203, logoHeight: 83 },
  // Row 8
  { name: "Intelas", href: "https://www.intelas.com/", logoSrc: `${BASE}/intelas.png`, logoWidth: 218, logoHeight: 54 },
  { name: "OpenEnvoy", href: "https://www.openenvoy.com/", logoSrc: `${BASE}/openenvoy.png`, logoWidth: 576, logoHeight: 136 },
  // Row 9
  { name: "Cofactr", href: "https://www.cofactr.com/", logoSrc: `${BASE}/cofactr.png`, logoWidth: 870, logoHeight: 180 },
  { name: "Butter", href: "https://usebutter.com/", logoSrc: `${BASE}/butter.png`, logoWidth: 536, logoHeight: 190 },
  { name: "Flagship AI", href: "https://www.flagship.ai/", logoSrc: `${BASE}/flagship.png`, logoWidth: 302, logoHeight: 78 },
  // Row 10
  { name: "Toolio", href: "https://www.toolio.com/", logoSrc: `${BASE}/toolio.png`, logoWidth: 312, logoHeight: 92 },
  { name: "Bloomfilter AI", href: "https://www.bloomfilter.ai/", logoSrc: `${BASE}/bloomfilter.png`, logoWidth: 808, logoHeight: 192 },
  { name: "Reejig", href: "https://reejig.com/", logoSrc: `${BASE}/reejig.png`, logoWidth: 730, logoHeight: 286 },
  // Row 11
  { name: "Privado AI", href: "https://www.privado.ai/", logoSrc: `${BASE}/privado.png`, logoWidth: 934, logoHeight: 282 },
  { name: "Booma AI", href: "https://www.booma.ai/", logoSrc: `${BASE}/booma.png`, logoWidth: 230, logoHeight: 58 },
  { name: "Zamp Finance", href: "https://www.zamp.finance/", logoSrc: `${BASE}/zamp.png`, logoWidth: 292, logoHeight: 102 },
  // Row 12
  { name: "Eyva AI", href: "https://www.eyva.ai/", logoSrc: `${BASE}/eyva.png`, logoWidth: 1024, logoHeight: 368 },
  { name: "Meddicc", href: "https://meddicc.com/", logoSrc: `${BASE}/meddicc.png`, logoWidth: 925, logoHeight: 240 },
  // Row 13
  { name: "Marco Experiences", href: "https://www.marcoexperiences.com/", logoSrc: `${BASE}/marco.png`, logoWidth: 183, logoHeight: 32 },
  { name: "Awesomic", href: "https://www.awesomic.com/", logoSrc: `${BASE}/awesomic.png`, logoWidth: 276, logoHeight: 50 },
  { name: "Zoomforth", href: "https://www.zoomforth.com/", logoSrc: `${BASE}/zoomforth.png`, logoWidth: 276, logoHeight: 94 },
  // Row 14
  { name: "PARC", href: "http://www.parc.com/", logoSrc: `${BASE}/parc.png`, logoWidth: 137, logoHeight: 48 },
  { name: "ThatsTheOne", href: "https://www.thatstheone.com/", logoSrc: `${BASE}/thatstheone.png`, logoWidth: 442, logoHeight: 82 },
  { name: "Magic Story", href: "https://www.magicstory.com/waitlist", logoSrc: `${BASE}/magicstory.png`, logoWidth: 300, logoHeight: 100 },
  // Row 15
  { name: "JoinPrequel", href: "https://www.joinprequel.com/", logoSrc: `${BASE}/joinprequel.png`, logoWidth: 304, logoHeight: 112 },
  { name: "TubeScience", href: "https://tubescience.com/", logoSrc: `${BASE}/tubescience.png`, logoWidth: 669, logoHeight: 197 },
  { name: "Alayna", href: "https://alayna.us/", logoSrc: `${BASE}/alayna.png`, logoWidth: 334, logoHeight: 98 },
];
