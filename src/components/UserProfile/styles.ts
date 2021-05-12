import styled from 'styled-components';

export const ProfileContainer = styled.div`
	width: 800px;
	margin: 0 auto;
	padding: 42px;
`;

export const ProfileTitle = styled.div`
	${({ theme }) => theme.align.flexVertical}
	justify-content: space-between;
	padding: 10px 32px 10px 32px;
	width: 800px;
	height: 60px;
	font-family: 'NanumSquareB';
	font-size: 26px;
	border-bottom: 1px solid ${({ theme }) => theme.color.lineColor};

	& > div {
		cursor: pointer;
		transition: 0.1s;
		${({ theme }) => theme.align.flexVertical}
		margin-top: 20px;
		font-family: 'NanumSquareR';
		font-size: 14px;

		&:hover {
			color: #478bff;
		}
	}
`;

// --------------------TODO: user profile Card-------------------------

export const Profile_UserCard = styled.div`
	${({ theme }) => theme.align.flexVertical}
	flex-direction: row;
	width: 800px;
	padding: 28px;
	border-bottom: 1px solid ${({ theme }) => theme.color.lineColor};
`;

export const Profile_Img = styled.div`
	${({ theme }) => theme.align.flexVertical}
	flex-direction: column;
	width: 200px;
	height: 200px;

	& > div {
		width: 180px;
		height: 180px;
		margin-bottom: 10px;
		background-color: #9c27b0;
		border-radius: 100%;

		& > div {
			${({ theme }) => theme.align.flexCenter}
			margin-top: 44px;
			font-family: 'NanumSquareR';
			font-size: 80px;
			color: #fff;
		}
	}

	& > span {
		cursor: pointer;
		font-family: 'NanumSquareR';
		font-size: 14px;
		color: #f15525;
	}
`;

export const Profile_UserInfoCard = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 0 12px 68px;
	width: 100%;

	& > div {
		${({ theme }) => theme.align.flexVertical}
		margin-bottom: 14px;
	}
`;

export const Profile_SubTitle = styled.span`
	${({ theme }) => theme.align.flexVertical}
	width: 200px;
	height: 30px;
	font-family: 'NanumSquareB';
`;

export const Profile_UserInfo = styled.span`
	${({ theme }) => theme.align.flexVertical}

	height: 30px;
	font-family: 'NanumSquareR';
	text-align: left;

	& > span {
		width: 140px;
		margin-right: 4px;
	}
`;

// --------------------TODO: user detail intro Card------------------

export const UserDetailIntroCard = styled.div`
	${({ theme }) => theme.align.flexVertical}
	flex-direction: column;
	width: 700px;
	margin: 0 auto;
`;

export const Profile_UserDetailInfo = styled.div`
	display: flex;
	flex-direction: column;
	padding: 30px 0 40px 68px;
	width: 100%;

	& > div {
		${({ theme }) => theme.align.flexVertical}
		margin-bottom: 14px;
	}
`;

export const Profile_Stack = styled.span`
	margin-right: 8px;
`;

export const Profile_UserRecipeInfo = styled.div`
	width: 700px;
	padding: 0 68px 30px 68px;
`;

export const RecipeCard_InitSetting = styled.div`
	& > div {
		margin-top: 20px;
	}
`;

export const Profile_InProgressRecipe = styled(RecipeCard_InitSetting)`
	margin-bottom: 40px;
`;

export const Profile_SuccessRecipe = styled(RecipeCard_InitSetting)``;

// --------------------TODO: Card Design------------------

export const Profile_RecipeCard = styled.div`
	cursor: pointer;
	transition: 0.1s;
	overflow: hidden;
	width: 200px;
	height: 270px;
	border-radius: 3px;
	box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.15);

	&: hover {
		transform: scale(1.03);
	}
`;

export const RecipeCard_Img = styled.div`
	width: 100%;
	height: 80px;
	background-color: ${({ theme }) => theme.color.pointColor};
	background-size: 100% 100%;
	background-position: center;
`;

export const RecipeCard_Content = styled.div`
	padding: 16px 24px;
`;

export const RecipeCard_title = styled.div`
	padding-bottom: 10px;
	font-family: 'NanumSquareB';
	font-size: 24px;
	border-bottom: 1px solid ${({ theme }) => theme.color.lineColor};

	& > div {
		padding: 4px 0;
		font-family: 'NanumSquareR';
		font-size: 14px;
		color: #444242;
	}
`;

export const RecipeCard_Description = styled.div`
	overflow: hidden;
	word-wrap: break-word;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	line-height: 1.6em;
	height: 5.6em;
	padding: 10px 0;
	font-family: 'NanumSquareR';
	font-size: 14px;
	color: #444242;
	text-overflow: ellipsis;
`;