if (import.meta.hot) {
  let lastReloadTime = 0; // 上次触发时间
  const RELOAD_COOLDOWN = 5000; // 5秒冷却时间
  const FLAG_KEY = "vite-error-reloaded"; // 防循环标志键

  import.meta.hot.on("vite:error", () => {
    console.count("[VITE] error");
    const now = Date.now();

    // 如果上次刷新标志存在，说明刚刷新过，不再重复刷新
    if (sessionStorage.getItem(FLAG_KEY)) {
      console.warn("[VITE] Error detected but reload skipped (already reloaded once)");
      return;
    }

    // 首次触发或超过冷却期
    if (now - lastReloadTime > RELOAD_COOLDOWN) {
      lastReloadTime = now;
      console.warn("[VITE] Error detected, reloading page...");

      // 设置标志，防止无限刷新
      sessionStorage.setItem(FLAG_KEY, "1");

      // 延迟执行 reload，以便标志写入完成
      setTimeout(() => {
        location.reload();
      }, 100);
    } else {
      console.warn("[VITE] Error detected but reload skipped (within 5s cooldown)");
    }
  });

  // 页面加载后清除标志
  window.addEventListener("load", () => {
    sessionStorage.removeItem(FLAG_KEY);
  });
}
