import React, { useEffect } from 'react';
import { getProfileInfo, getProfileInfoSelector } from '../../../reducer/profile';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { HiOutlinePencilAlt } from 'react-icons/hi';

import ProfileBottom from '../ProfileBottom';

import {
	ProfileContainer,
	ProfileTitle,
	ProfileImg,
	ProfileUserInfo,
	ProfileSubTitle,
	ProfileUserCard,
	ProfileUserInfoCard,
	InputWrapper,
} from './styles';
import ProfileImage from '../../Common/ProfileImage';

const UserProfile = (): JSX.Element => {
	const profileInfo = useSelector(getProfileInfoSelector);
	const history = useHistory();
	const dispatch = useDispatch();

	const onGoToEditPage = (): void => {
		// TODO: 유저 아이디로 구별해서 페이지 전환해야 함
		history.push(`/profile/${profileInfo.id}/edit`);
	};

	useEffect(() => {
		dispatch(getProfileInfo());
	}, []);

	return (
		<ProfileContainer>
			<ProfileTitle>
				<span>나의 프로필</span>
				<div onClick={onGoToEditPage}>
					<HiOutlinePencilAlt />
					&nbsp;프로필 수정
				</div>
			</ProfileTitle>

			{/* TODO: 유저 개인 정보 */}
			<ProfileUserCard>
				<ProfileImg>
					<div>
						<ProfileImage
							width="100%"
							height="100%"
							profileImage={profileInfo.uploadImage}
							profileColor={profileInfo.profileColor}
							userName={profileInfo.name}
							userNameSize="120px"
						/>
					</div>
				</ProfileImg>
				<ProfileUserInfoCard>
					<div>
						<InputWrapper>
							<ProfileSubTitle>이름</ProfileSubTitle>
							<ProfileUserInfo>
								{profileInfo.name ? profileInfo.name : <>{profileInfo.email.split('@')[0]}</>}
							</ProfileUserInfo>
						</InputWrapper>
					</div>
					<div>
						<InputWrapper>
							<ProfileSubTitle>전화번호</ProfileSubTitle>
							<ProfileUserInfo>
								{profileInfo.mobile ? profileInfo.mobile : <div>프로필을 설정해 주세요</div>}
							</ProfileUserInfo>
						</InputWrapper>
					</div>
					<div>
						<InputWrapper>
							<ProfileSubTitle>이메일</ProfileSubTitle>
							<ProfileUserInfo>{profileInfo.email}</ProfileUserInfo>
						</InputWrapper>
					</div>
					<div>
						<InputWrapper>
							<ProfileSubTitle>한줄 소개</ProfileSubTitle>
							<ProfileUserInfo>
								{profileInfo.aboutMe ? profileInfo.aboutMe : <div>프로필을 설정해 주세요</div>}
							</ProfileUserInfo>
						</InputWrapper>
					</div>
				</ProfileUserInfoCard>
			</ProfileUserCard>
			<ProfileBottom profileInfo={profileInfo} />
		</ProfileContainer>
	);
};

export default UserProfile;
