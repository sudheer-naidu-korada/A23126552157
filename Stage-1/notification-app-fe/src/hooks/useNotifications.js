import { useState, useEffect } from "react";
import { fetchNotifications } from "../apis/notifications";

export function useNotifications(filter, page) {
  const [notifications, setNotifications] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchNotifications();
        const filtered = filter ? data.filter((n) => n.read === (filter === "read")) : data;
        setTotalPages(Math.ceil(filtered.length / 5) || 1);
        const start = (page - 1) * 5;
        setNotifications(filtered.slice(start, start + 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [filter, page]);

  return { notifications, totalPages, loading, error };
}