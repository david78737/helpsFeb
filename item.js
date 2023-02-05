/* 
get single THE: artwork - nonprofit - business
single item JS id for item
when more button clicked on home page
*/
var Webflow = Webflow || [];
Webflow.push(function () {
  var myUrl = new URL(document.location.href);
  var myParam = myUrl.searchParams.get("artId") || 20;
  //js Fiddle item page script January 2023
  // (1) Art and the Artist* 1/25/2023

  function myImage(itemFile, altText) {
    const img = $("<img />");
    $(img).attr("alt", altText);
    $(img).attr("data-blink-src", itemFile);
    $(img).attr("width", "280");
    $(img).attr("height", "");
    return img;
  }

  function checkBioImage(artist) {
    const artistBioImage = artist && artist.artistBioImage; // check for null values
    if (artistBioImage) {
      $(".bio-pic-default").css("class", "bio-pic-default is--hidden");
      $(".bio-pic").css("class", "bio-pic"); // display block
      $(".bio-pic.is--artist").attr("src", artistBioImage);
    } else {
      $(".bio-pic-default").attr("class", "bio-pic-default"); // display VanGogh
      $(".bio-pic").css("class", "bio-pic is--hidden");
    }
  }

  function artAndArtist(artwork) {
    // populates this slide
    const artist = artwork.artist;
    checkBioImage(artist);

    let artistBio = "The artist has not provided a biography";
    artistBio = artist && artist.artistBio; // check for null values
    artistBio = artistBio.substring(0, 300);
    $(".artist-bio.is--artist").text(artistBio);

    let edition_size = "The artist has not provided a edition size";
    edition_size = artwork && artwork.edition_size; // check for null values
    $(".edition_size").text(edition_size);

    let description = "The artist has not provided a description";
    description = artwork && artwork.description; // check for null values
    description = description.substring(0, 300);
    $(".description").text(description);

    $(".art-file-uuid.is--artist").attr("src", artwork.file); //
    $(".splide-title.is--artist").text(artwork.title); //
    $(".splide-artist.is--artist").text(artwork.artistFullName); //
    $(".dims-width.is--artist").text(artwork.width); //
    $(".dims-height.is--artist").text(artwork.height); //
  } // end Art And Artist

  function artistPortfolio(artist_portfolio) {
    // dataset for this slide
    const _dimensions =
      "Dimensions: " + artist_portfolio.width + " x " + artist_portfolio.height;
    let _displayedNpName = artist_portfolio._default_np.name;
    let _displayedNpURL = artist_portfolio._default_np.OrganizationURL;
    var _npSelectedNpId = -1;
    if (_npSelectedNpId && _npSelectedNpId > 0) {
      // show the NP selected
      $("._npSelectedNpName").html(artist_portfolio._selecting_np.name);
      $("._npSelectedNpURL").attr(
        "href",
        artist_portfolio._selecting_np.OrganizationURL
      );
    }

    $(".artist-link").text(artist_portfolio.artistWebsiteText);
    $(".artist-link").attr("href", artist_portfolio.artistWebsite);
    $(".art-file-uuid.is--other-art").attr("src", artist_portfolio.file);
    $(".splide-title").text(artist_portfolio.title);
    $(".splide-artist").text("By " + artist_portfolio.artistFullName);
    $(".splide-dimensions").text(_dimensions);
    $(".splide-description").text(artist_portfolio.description);
    $(".splide-edition-size").text(artist_portfolio.edition_size);
    $(".np-link-displayed").attr("href", artist_portfolio._npSelectedNpURL); // image
    $(".np-link-displayed").html(_displayedNpName); // link block
    let SKU = artist_portfolio.SKU;
    let price = artist_portfolio.price;
    let SKU_framed = artist_portfolio.SKU_framed;
    let price_framed = artist_portfolio.price_framed;
    let param = "?item=" + SKU + "&price=" + price;
    const _unframedItemLink =
      "https://www.helps-austin.com/order-draft" + param;
    $(".is--unframed").text(_price);
    $(".is--unframed").attr("href", _unframedItemLink);
    const framedParam = "?item=" + SKU_framed + "&price=" + price_framed;
    const _framedItemLink =
      "https://www.helps-austin.com/order-draft" + framedParam;
    $(".is--framed").text(price_framed);
    $(".is--framed").attr("href", _framedItemLink);
    $(".np-link-default").html(_displayedNpName);
    $(".np-link-default").attr("href", _displayedNpURL);
  } // end artistPortfolio

  function nonprofitSlide(nonprofit) {
    // dataset for this slide
    const _nonprofitId = nonprofit.id;
    const _nonprofitName = nonprofit.name;
    const _nonprofitOrganizationURL = nonprofit.OrganizationURL;
    const _nonprofitMissionByDirector = nonprofit.missionByDirector;
    const _nonprofitProgramByDirector = nonprofit.programByDirector;
    const _nonprofitPopulationByDirector = nonprofit.populationByDirector;

    let _mission = nonprofit.Mission || "no data available";
    let _programs = nonprofit.Programs || "no data available";
    let _population = nonprofit.population_served || "no data available";

    if (_nonprofitMissionByDirector) {
      _mission = _nonprofitMissionByDirector;
    }
    if (_nonprofitProgramByDirector) {
      _programs = _nonprofitProgramByDirector;
    }
    if (_nonprofitPopulationByDirector) {
      _population = _nonprofitPopulationByDirector;
    }

    _mission = _mission.substring(0, 1200);
    _programs = _programs.substring(0, 1200);
    _population = _population.substring(0, 1200);

    $(".nonprofitId").text(_nonprofitId);
    $(".nonprofitName").text(_nonprofitName);
    $(".nonprofitOrganizationURL").attr("href", _nonprofitOrganizationURL);
    $(".mission-pg").text(_mission);
    $(".program-pg").text(_programs);
    $(".population-pg").text(_population);
  }

  // END artists portfolio

  async function getItemSplidePayload() {
    var artId = 264; // default value
    var myUrl = new URL(document.location.href);
    // var artId = myUrl.searchParams.get("artId");
    if (myUrl.searchParams.get("artId")) {
      artId = myUrl.searchParams.get("artId");
    } // checking for null values
    const requestURL =
      "https://xkwy-af3e-bx9m.n7.xano.io/api:arLEd2EP/item_artwork?artId=" +
      artId;
    const result = await fetch(requestURL); //
    const obj = await result.json(); //

    const artwork = obj.artwork; // create the datasets for each page
    const artist = obj.artist;
    const artist_portfolio = obj.artist_portfolio;
    const nonprofit = obj.nonprofit;
    const nonprofit_portfolio = obj.nonprofit_portfolio;
    const businesses_donating = obj.businesses_donating;
    const supporting_artists = obj.supporting_artists;
    document.addEventListener("DOMContentLoaded", () => getItemSplidePayload());
    artAndArtist(artwork); // create first item aplide page
    artistPortfolio(artist_portfolio);
    nonprofitSlide(nonprofit);
  }
}); // END webflow push

async function getSingle() {
  const requestURL =
    "https://xkwy-af3e-bx9m.n7.xano.io/api:arLEd2EP/GET_premium_item/?id=" +
    myParam;
  const result = await fetch(requestURL); // Fetch the data from the network
  const obj = await result.json(); // Turn the result into an object in memory
  const nonprofit = obj._nonprofit;
  const artwork = obj._artworks; // Get the sub-member of the object
  const active = nonprofit.active;
  const template_np = $("#sample-card_nonprofit");
  const clone_np = $(template_np).clone();
  $(clone_np).find(".h1_nonprofit_name").text(nonprofit.nonprofit_name); //
  $(clone_np)
    .find(".candid_credentials")
    .text("https://www.guidestar.org/profile/" + nonprofit.ein); //
  $(clone_np).find(".nonprofit_website").text(nonprofit.nonprofit_website_url); //
  $(clone_np)
    .find(".make_a_donation")
    .text("https://www.helps-austin.com/donate?id=" + nonprofit.id); //
  $(clone_np).find(".mission").text(nonprofit.nonprofit_mission); //
  $(clone_np).find(".target_population").text(nonprofit.targetPopulation); //
  $(clone_np).find(".services_provided").text(nonprofit.nonprofit_services); //
  $(clone_np).find(".active").text(active); //
  $(clone_np).find(".p_EIN").text(ein); //

  const template = $("#sample-card-premiums");
  const clone = $(template).clone();
  const artwork_image = artwork.file; // ucUUID
  $(clone).attr("id", "card-" + artwork_image); // this is optional
  $(clone).show();

  const title = artwork.title;
  const artist = artwork.artistFullName;
  const myTitle = title + "<br>by " + artist;
  const ARTlazyLoaderImage = myImage(artwork, myTitle);
  $(clone).find(".artwork").append(ARTlazyLoaderImage);

  const artworkID = artwork.id;
  const likeButtonID = "aid" + artworkID; // e.g. aid123456
  const premium_artwork = artwork.file;
  const description = artwork.description;
  //const qParams = artwork.qParams;
  //const PriceInfo = artwork.price;
  const seriesSize = artwork.seriesSize;
  const width = artwork.width;
  const height = artwork.height;
  const dimensions =
    "Dimensions: " + artwork.width + '" x ' + artwork.height + '"';
  const myURL = artwork._artist_website;

  $(clone).find(".premium_title").text(title); //
  $(clone)
    .find(".premium_artist")
    .text("by: " + artist); //
  $(clone).find(".premium_description").text(description.substring(0, 100)); //
  $(clone).find(".premium_price").append(artwork.price); //
  $(clone).find(".premium_dimensions").append(dimensions); //
  $(clone).find("#aid").prop({ id: likeButtonID, class: "likebutton false" });
  $(clone).find(".seriesSize").text(seriesSize); //

  $(cardsContainer).append(clone);
}
// This fires all of the defined functions when the document is "ready" or loaded
document.addEventListener("DOMContentLoaded", () => getSingle());

document.addEventListener("DOMContentLoaded", function () {
  new Splide("#each-splide", {
    perPage: 3,
    perMove: 1,
    gap: "30px",
    pagination: false
  }).mount();
});

document.addEventListener("DOMContentLoaded", function () {
  new Splide("#each-thumb", {
    perPage: 4,
    perMove: 1,
    gap: "30px",
    pagination: false
  }).mount();
});
document.addEventListener("DOMContentLoaded", function () {
  var main = new Splide("#image-carousel", {
    type: "fade",
    rewind: true,
    fixedWidth: 350,
    fixedHeight: 420,
    gap: 10,
    pagination: false,
    arrows: false
  });

  var thumbnails = new Splide("#thumbnail-carousel", {
    fixedWidth: 120,
    fixedHeight: 320,
    gap: 10,
    rewind: true,
    pagination: false,
    isNavigation: true,
    breakpoints: {
      600: {
        fixedWidth: 60,
        fixedHeight: 44
      }
    }
  });
  main.sync(thumbnails);
  main.mount();
  thumbnails.mount();
});
/*
  const myTitle = title + "<br>by " + artistFullName; 
  const title = artwork.title;
  const artistFullName = artwork.artistFullName;
  const width = artwork.width;
  const height = artwork.height;
  const artistWebsite = artwork.artistWebsite;
  const nonprofit_id = artwork.nonprofit_id;
  const price = artwork.price;
  const seriesSize = artwork.seriesSize;
  const likeButtonID = "aid" + artId; // e.g. aid123456
  const PriceInfo = artwork.price;
  const myURL = artwork._artist_website;

  
  // console.log("requestURL = ", requestURL)
  // console.log("artId = ", artId)
*/
