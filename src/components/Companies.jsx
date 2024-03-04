import {
  faAws,
  faHooli,
  faLyft,
  faPiedPiperHat,
  faRedditAlien,
  faStripe,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Companies() {
  return (
    <div className="flex flex-wrap flex-col lg:flex-row gap-1 px-[50px] sm:px-[195px] justify-between mt-5">
      <FontAwesomeIcon
        icon={faHooli}
        size="5x"
        style={{ color: "#737373" }}
        className="company-button"
      />
      <FontAwesomeIcon
        icon={faLyft}
        size="5x"
        style={{ color: "#737373" }}
        className="company-button"
      />
      <FontAwesomeIcon
        icon={faPiedPiperHat}
        size="5x"
        style={{ color: "#737373" }}
        className="company-button"
      />
      <FontAwesomeIcon
        icon={faStripe}
        size="5x"
        style={{ color: "#737373" }}
        className="company-button"
      />
      <FontAwesomeIcon
        icon={faAws}
        size="5x"
        style={{ color: "#737373" }}
        className="company-button"
      />
      <FontAwesomeIcon
        icon={faRedditAlien}
        size="5x"
        style={{ color: "#737373" }}
        className="company-button"
      />
    </div>
  );
}
