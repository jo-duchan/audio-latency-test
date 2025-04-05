import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '8a36-2406-5900-10bf-781a-6dc5-860e-f4a6-99b9.ngrok-free.app',
    ],
    host: true, // 외부 접속 허용
    port: 5173, // 포트 설정 (원하는 포트로 변경 가능)
  },
});
