import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectLogs } from './gameSlice';
import styles from './Game.module.css';

export default function Logs() {
  const logs = useSelector(selectLogs);
  const logsEndRef = useRef(null);
  const scrollToBottom = () => {
    logsEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [logs]);

  return (
    <div className={styles.Logs}>
      {logs.map((log, index) => <div key={index}>{log}</div>)}
      <div ref={logsEndRef} />
    </div>
  );
}
