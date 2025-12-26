"use client";

export default function SponsorButton() {
  const handleClick = () => {
    window.location.href =
      "mailto:sponsor@mistblitz.com" +
      "?subject=Sponsorship%20Inquiry%20%E2%80%93%20Mist%20Blitz" +
      "&body=Assalamualaikum%2C%0A%0A" +
      "I%20hope%20this%20email%20finds%20you%20well.%0A%0A" +
      "I%20am%20interested%20in%20sponsoring%20Mist%20Blitz%20and%20would%20like%20to%20learn%20more%20about%20your%20sponsorship%20opportunities%2C%20audience%20reach%2C%20and%20collaboration%20models.%0A%0A" +
      "Please%20let%20me%20know%20the%20next%20steps%20and%20any%20relevant%20details.%0A%0A" +
      "Best%20regards%2C%0A" +
      "Name%3A%0A" +
      "Company%20%2F%20Organization%3A%0A" +
      "Phone%3A%0A" +
      "Email%3A";
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
    >
      Sponsor Us
    </button>
  );
}
