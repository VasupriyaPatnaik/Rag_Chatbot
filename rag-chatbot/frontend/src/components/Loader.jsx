import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      style={styles.loader}
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ repeat: Infinity, duration: 1 }}
    />
  );
};

const styles = {
  loader: {
    width: "30px",
    height: "30px",
    background: "#ff4d6d",
    borderRadius: "50%",
  },
};

export default Loader;
