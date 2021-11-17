import styled, { keyframes } from 'styled-components';

export const SkeletonContainer = styled.div`
	overflow: hidden;
	width: 410px;
	height: 393px;
	margin: 20px;
	box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);
	border-radius: 3px;
`;

export const SkeletonContent = styled.div`
	padding: 20px 30px;
`;

const SkeletonItem = styled.div`
	background-color: #d6d6d8;
	background-repeat: repeat-x;
	background-image: linear-gradient(
			100deg,
			rgba(255, 255, 255, 0.3),
			rgba(255, 255, 255, 0.4) 80%,
			rgba(255, 255, 255, 0.3) 90%
		),
		linear-gradient(#d6d6d8 0, transparent 0);

	border-radius: 3px;
`;

export const SkeletonImg = styled(SkeletonItem)`
	width: 100%;
	height: 120px;
	background-position: -410px 0, 0 0;
`;

export const SkeletonTitle = styled(SkeletonItem)`
	width: 200px;
	height: 19px;
	margin-bottom: 15px;
	background-position: -200px 0, 0 0;
`;

export const SkeletonInfo = styled(SkeletonItem)`
	width: 150px;
	height: 19px;
	margin-bottom: 15px;
	background-position: -150px 0, 0 0;
`;

export const SkeletonDesc = styled(SkeletonItem)`
	width: 100%;
	height: 36px;
	margin-bottom: 30px;
	background-position: -350px 0, 0 0;
`;

export const SkeletonStackWrap = styled.div`
	display: flex;
	width: 100%;
	height: 66px;
`;

export const SkeletonStack = styled(SkeletonItem)`
	width: 78px;
	height: 28px;
	margin-right: 5px;
	background-position: -78px 0, 0 0;
`;

export const SkeletonTime = styled(SkeletonItem)`
	width: 50px;
	height: 16px;
	background-position: -50px 0, 0 0;
`;
