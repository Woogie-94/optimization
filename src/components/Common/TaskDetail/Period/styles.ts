import styled from 'styled-components';

export const PeriodWrap = styled.div`
	${({ theme }) => theme.align.flexVertical}
	font-family: 'NanumSquareB';
`;

export const DateCustomBtn = styled.button`
	transition: 0.1s;
	width: 100px;
	height: 32px;
	margin-right: 15px;
	font-size: 15px;
	color: #a8a8a8;
	background-color: #f6f6f8;

	&:hover {
		background-color: #f0f0f0;
	}
`;
