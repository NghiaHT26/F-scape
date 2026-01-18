import { useEffect, useState } from "react";
import { Users, ArrowRight } from "lucide-react";

// Component Skeleton để giả lập hiệu ứng loading (Lazy Loading UI)
const RoomSkeleton = () => (
  <div className="skeleton-card">
    <div className="skeleton-img"></div>
    <div className="skeleton-content">
      <div className="skeleton-line title"></div>
      <div className="skeleton-line text"></div>
      <div className="skeleton-line text short"></div>
    </div>
    <style jsx>{`
      .skeleton-card {
        display: flex;
        gap: 20px;
        background: #fff;
        padding: 16px;
        border-radius: 16px;
        margin-bottom: 16px;
      }
      .skeleton-img { width: 120px; height: 120px; background: #eee; border-radius: 12px; }
      .skeleton-line { background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%); background-size: 200% 100%; animation: loading 1.5s infinite; margin-bottom: 10px; border-radius: 4px; }
      .title { height: 20px; width: 40%; }
      .text { height: 14px; width: 80%; }
      .short { width: 30%; }
      @keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
    `}</style>
  </div>
);

export default function GuestHomePage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/rooms");
        const data = await res.json();
        setRooms(data);
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        setTimeout(() => setLoading(false), 1500); // Giả lập delay để thấy hiệu ứng skeleton
      }
    };
    fetchRooms();
  }, []);

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>F-scape</h1>
          <nav style={styles.nav}>
            <span style={styles.navItem}>Khám phá</span>
            <span style={styles.navItem}>Về chúng tôi</span>
            <button style={styles.loginBtn}>Đặt Phòng</button>
          </nav>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.sectionTitle}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1a1a1a" }}>
            Danh sách phòng trống
          </h2>
          <p style={{ color: "#666", marginTop: "4px" }}>Tìm kiếm không gian sống lý tưởng cho bạn</p>
        </div>

        {/* List Content */}
        <div style={styles.listContainer}>
          {loading ? (
            <>
              <RoomSkeleton />
              <RoomSkeleton />
              <RoomSkeleton />
            </>
          ) : (
            rooms.map((room) => (
              <div key={room.id} style={styles.card} className="room-card">
                {/* Giả định có ảnh phòng, nếu không có sẽ lấy placeholder */}
                <img 
                  src={room.image || `https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=300&fit=crop`} 
                  alt={room.name} 
                  style={styles.roomImage}
                  loading="lazy" 
                />
                
                <div style={styles.infoContainer}>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.roomName}>{room.name}</h3>
                    <span style={{
                      ...styles.badge,
                      background: room.isAvailable ? "#e6fcf5" : "#fff5f5",
                      color: room.isAvailable ? "#0ca678" : "#f03e3e"
                    }}>
                      {room.isAvailable ? "• Còn trống" : "• Đã thuê"}
                    </span>
                  </div>

                  <div style={styles.details}>
                    <div style={styles.detailItem}>
                      <Users size={16} color="#666" /> <span>Tối đa {room.capacity} người</span>
                    </div>
                  </div>

                  <div style={styles.cardFooter}>
                    <div style={styles.priceTag}>
                      <span style={styles.price}>${room.price}</span>
                      <span style={styles.unit}>/tháng</span>
                    </div>
                    <button style={styles.viewMoreBtn}>
                      Chi tiết <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    background: "#f8f9fa",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    borderBottom: "1px solid #eee",
    padding: "0 24px",
  },
  headerContent: {
    maxWidth: "1000px",
    margin: "0 auto",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#1a1a1a",
    letterSpacing: "-1px",
    margin: 0,
  },
  nav: { display: "flex", alignItems: "center", gap: "24px" },
  navItem: { fontSize: "14px", fontWeight: "500", color: "#444", cursor: "pointer" },
  loginBtn: {
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    padding: "8px 18px",
    borderRadius: "20px",
    fontWeight: "500",
    cursor: "pointer",
  },
  main: {
    maxWidth: "800px", // Giới hạn chiều rộng để danh sách dọc trông đẹp hơn
    margin: "40px auto",
    padding: "0 20px",
  },
  sectionTitle: { marginBottom: "30px" },
  listContainer: { display: "flex", flexDirection: "column", gap: "20px" },
  card: {
    display: "flex",
    background: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
    border: "1px solid #f0f0f0",
  },
  roomImage: {
    width: "200px",
    height: "180px",
    objectFit: "cover",
  },
  infoContainer: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  roomName: { fontSize: "18px", fontWeight: "700", margin: 0, color: "#2d3436" },
  badge: {
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },
  details: { display: "flex", gap: "15px", marginTop: "8px" },
  detailItem: { display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#636e72" },
  cardFooter: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #f8f9fa",
    paddingTop: "15px",
  },
  priceTag: { display: "flex", alignItems: "baseline", gap: "2px" },
  price: { fontSize: "20px", fontWeight: "800", color: "#1a1a1a" },
  unit: { fontSize: "12px", color: "#888" },
  viewMoreBtn: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    background: "none",
    border: "none",
    color: "#3498db",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
  }
};