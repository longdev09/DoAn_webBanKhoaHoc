import { useState, useEffect } from "react";

const useLoading = (fetchDataCallback) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Gọi hàm callback để tải dữ liệu
        await fetchDataCallback();
      } catch (error) {
        // Xử lý lỗi nếu cần thiết
        console.error("Error fetching data:", error);
      } finally {
        // Khi dữ liệu đã được tải xong hoặc có lỗi, set loading thành false
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return loading;
};
export default useLoading;
