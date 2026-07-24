import { useContent } from "../useContent";

export default function Footer() {
  const { profile } = useContent();
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <img
            className="brand__mark"
            src="/mark.png"
            alt=""
            width="28"
            height="28"
          />
          <span className="brand__signature">{profile.name}</span>
        </div>
        <div className="site-footer__meta">
          <p>
            © {year} {profile.name}. Built for{" "}
            <a href={profile.site}>{profile.site.replace("https://", "")}</a>
            {"."}
          </p>
          <p>
            Practice:{" "}
            <a href={profile.practice.url} target="_blank" rel="noreferrer">
              {profile.practice.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
