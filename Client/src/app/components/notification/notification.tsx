"use client"

import React, { Suspense, useEffect } from "react";
import { notification, NotificationArgsProps } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

const Notification: React.FC<{count: number, display: boolean, type: NotificationType, message: string, description?: string }> = (
  {
    count,
    display,
    type,
    message,
    description
  }
) => {
  const [enabled, setEnabled] = React.useState(true);
  const [threshold, setThreshold] = React.useState(2);
  const [api, contextHolder] = notification.useNotification({
    stack: enabled
      ? {
          threshold,
        }
      : false,
  });

  useEffect(() => {
    if(display){
      api[type]({
        placement: "bottomLeft",
        message: message,
        description: description,
        duration: 3,
      });
    }
  },[count]);

  return (
    <Suspense>
      {contextHolder}
    </Suspense>
  );
};

export default Notification;
