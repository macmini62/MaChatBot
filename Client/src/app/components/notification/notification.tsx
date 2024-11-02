"use client"

import React, { Suspense, useEffect } from "react";
import { notification, NotificationArgsProps } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";
type NotificationPlacement = NotificationArgsProps["placement"];

const Notification: React.FC<{type: NotificationType, placement: NotificationPlacement, message: string, description?: string }> = (
  {
    type,
    placement,
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
    if(type){
      api[type]({
        placement: placement,
        message: message,
        description: description,
        duration: null,
      });
    }
  }, [type])

  return (
    <Suspense>
      {contextHolder}
    </Suspense>
  );
};

export default Notification;
