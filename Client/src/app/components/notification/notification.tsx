"use client"

import React from "react";
import { Button, notification, NotificationArgsProps, Space } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";
type NotificationPlacement = NotificationArgsProps["placement"];

const Notification: React.FC = () => {
  const [enabled, setEnabled] = React.useState(true);
  const [threshold, setThreshold] = React.useState(2);
  const [api, contextHolder] = notification.useNotification({
    stack: enabled
      ? {
          threshold,
        }
      : false,
  });

  const openNotificationWithIcon = (type: NotificationType, placement: NotificationPlacement) => {
    api[type]({
      message: "Notification Title",
      description: `${new Array(Math.round(Math.random() * 5) + 1)
        .fill("This is the content of the notification.")
        .join("\n")}`,
      duration: null,
    });
  };

  return (
    <>
      {contextHolder}
      <Space>
        <Button onClick={() => openNotificationWithIcon("success", "bottomLeft")}>Success</Button>
        <Button onClick={() => openNotificationWithIcon("info", "bottomLeft")}>Info</Button>
        <Button onClick={() => openNotificationWithIcon("warning", "bottomLeft")}>Warning</Button>
        <Button onClick={() => openNotificationWithIcon("error", "bottomLeft")}>Error</Button>
      </Space>
    </>
  );
}; 

export default Notification;
