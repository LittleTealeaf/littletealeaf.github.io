import { getGenerated, index } from "../libs/resources";

export default function Announcement({}) {
  const announcements = getGenerated(index.announcements);

  return (
    <center>
        {announcements.map((item, index) => (
          <div
            key={index}
            style={{
              borderRadius: "100px",
              padding: "10px",
              width: "70%",
              background: "pink",
            }}
          >
            {item}
          </div>
        ))}
      </center>
  );
}
