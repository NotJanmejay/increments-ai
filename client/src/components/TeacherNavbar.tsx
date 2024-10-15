import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function TeacherNavbar() {
  const location = useLocation();
  const breadCrumbs = location.pathname.split("/");
  const page = breadCrumbs[breadCrumbs.length - 1];
  const navigate = useNavigate();
  return (
    <nav id="teacher-navbar">
      <img src="/msbc-logo.png" alt="MSBC Logo" id="msbc-logo" />
      <div className="nav-contents">
        {page == "student" ? (
          <p
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer" }}
          >
            Home
          </p>
        ) : (
          <p>Increments</p>
        )}
      </div>
    </nav>
  );
}
