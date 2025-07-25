import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link

const PortfolioPage = () => {
  const styles = {
    section: {
      padding: "50px 20px",
      backgroundColor: "#F7F7F7",
      color: "Black",
    },
    portfolioCard: {
      maxWidth: "350px",
      margin: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease",
    },
    cardImage: {
      borderRadius: "10px",
      height: "250px",
      objectFit: "cover",
    },
    videoStyle: {
      borderRadius: "10px",
      height: "250px",
      objectFit: "cover",
    },
    hoverCard: {
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
      },
    },
  };

  const [portfolioList, setPortfolioList] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/portfolio`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch portfolio items");
        }

        const data = await response.json();
        setPortfolioList(data); // Assuming the backend returns an array of portfolio items
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPortfolioItems();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          padding: "50px 20px",
          backgroundColor: "#F7F7F7",
          color: "Black",
        }}
      >
        <h1>Our Portfolio</h1>
        <p>
          Discover the artistry of Luxureon. Here are some of our most loved
          creations tailored for our clients.
        </p>
      </section>

      {/* Portfolio Section */}
      <section style={styles.section}>
        <h2 className="text-center">Our Creations</h2>
        <div className="d-flex flex-wrap justify-content-center mt-4">
          {portfolioList.map((item, index) => (
            <Card
              key={index}
              style={{ ...styles.portfolioCard, ...styles.hoverCard }}
            >
              {/* Check if images is an array and contains at least one image or video */}
              {Array.isArray(item.images) && item.images.length > 0 ? (
                item.images[0].endsWith(".mp4") ? (
                  <video
                    controls
                    style={styles.videoStyle}
                    src={item.images[0]}
                    alt={item.title}
                  />
                ) : (
                  <Card.Img
                    variant="top"
                    src={item.images[0]}
                    alt={item.title}
                    style={styles.cardImage}
                  />
                )
              ) : item.images && item.images !== "" ? (
                item.images.endsWith(".mp4") ? (
                  <video
                    controls
                    style={styles.videoStyle}
                    src={item.images}
                    alt={item.title}
                  />
                ) : (
                  <Card.Img
                    variant="top"
                    src={item.images}
                    alt={item.title}
                    style={styles.cardImage}
                  />
                )
              ) : (
                <Card.Text>No media available</Card.Text>
              )}

              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Link to={`/project/${item._id}`}>
                  <Button variant="warning">View Project</Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
