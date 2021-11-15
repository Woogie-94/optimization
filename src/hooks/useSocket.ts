import { useCallback, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

const useSocket = (projectUrl: string, address: string): [Socket | undefined, () => void, () => void] => {
	const loginInfo = window.localStorage.getItem('loginInfo');
	const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

	// TODO: 프로젝트가 바뀌면 연결을 끊고 다시 연결할 수 있는 기능이다.
	const disconnectSocket = useCallback(() => {
		if (projectUrl && socket) {
			socket.disconnect();
		}
	}, [socket]);

	// TODO: 연결이 안되어 있다면 요청하고, 되어있으면 한번만 연결할 수 있도록 해준다.

	const connectSocket = () => {
		if (!socket && loginInfo) {
			const { accessToken, loginType } = JSON.parse(loginInfo);
			const socket = io(`http://localhost:4000/${address}/${projectUrl}`, {
				transports: ['websocket'],
				auth: {
					token: accessToken,
					loginType: loginType,
				},
				query: {
					projectURL: projectUrl,
				},
			});

			setSocket(socket);
		}
	};

	return [socket, connectSocket, disconnectSocket];
};

export default useSocket;
