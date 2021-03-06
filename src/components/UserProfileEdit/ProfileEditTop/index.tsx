import React, { useState, useEffect, useRef } from 'react';
import { getProfileInfoSelector } from '../../../reducer/profile';
import useInput from '../../../hooks/useInput';
import { changeImage, clickUploadImage } from '../../../utils/imageUpload';
import { profileAboutMeValid, profileNameValid, profileMobileValid } from '../../../utils/validations';

import { useSelector } from 'react-redux';

import Input from '../../Common/Input';
import ProfileImage from '../../Common/ProfileImage';
import ProfileEditBottom from '../ProfileEditBottom';

import {
	ProfileContainer,
	ProfileTitle,
	ProfileUserInfo,
	ProfileSubTitle,
	ProfileUserCard,
	ProfileUserInfoCard,
	ProfileImg,
	InputWrapper,
} from '../../UserProfile/ProfileTop/styles';
import {
	EmailInfoWrapper,
	ProfileImageUploadButton,
	ProfileImageUploadWrapper,
	ProfileUserEmail,
	InvalidMessage,
} from './styles';

const UserProfileEdit = (): JSX.Element => {
	const profileInfo = useSelector(getProfileInfoSelector);
	const imageInput = useRef<HTMLInputElement>(null);
	const [image, setImage] = useState<string>(profileInfo.uploadImage);
	const [name, onChangeName] = useInput<string>(profileInfo.name);
	const [mobile, onChangeMobile] = useInput<string>(profileInfo.mobile);
	const [aboutMe, onChangeAboutMe] = useInput<string>(profileInfo.aboutMe);
	const [stackBucket, setStackBucket] = useState<string[]>(profileInfo.stacks);
	const [nameValidation, setNameValidation] = useState<boolean>(true);
	const [mobileValidation, setMobileValidation] = useState<boolean>(true);
	const [aboutMeValidation, setAboutMeValidation] = useState<boolean>(true);

	// TODO: 이미지 리셋 하기
	const onResetImage = (): void => {
		setImage('');
	};

	useEffect(() => {
		setImage(profileInfo.uploadImage);
		setStackBucket(profileInfo.stacks);
	}, [profileInfo.uploadImage]);

	useEffect(() => {
		// TODO: 유저 정보 입력 유효성 검사
		const nameCheck = profileNameValid(name);
		const mobileCheck = profileMobileValid(mobile);
		const aboutMeCheck = profileAboutMeValid(aboutMe);

		setNameValidation(nameCheck);
		setMobileValidation(mobileCheck);
		setAboutMeValidation(aboutMeCheck);
	}, [name, mobile, aboutMe]);

	return (
		<ProfileContainer>
			<ProfileTitle>
				<span>프로필 수정하기</span>
			</ProfileTitle>

			{/* TODO: 유저 개인 정보 */}
			<ProfileUserCard>
				<ProfileImg>
					{/* TODO: 이미지 요청 */}
					<form encType="multipart/form-data">
						<input
							type="file"
							accept="image/jpg,image/png,/image/jpeg"
							name="file"
							hidden
							onChange={e => changeImage(e, setImage)}
							ref={imageInput}
						/>
					</form>
					<div
						onClick={() => {
							clickUploadImage(imageInput);
						}}
					>
						<ProfileImageUploadWrapper>
							<ProfileImageUploadButton>
								<span>이미지 업로드</span>
							</ProfileImageUploadButton>
							<ProfileImage
								width="100%"
								height="100%"
								profileImage={image}
								profileColor={profileInfo.profileColor}
								userName={profileInfo.name}
								userNameSize="140px"
							/>
						</ProfileImageUploadWrapper>
					</div>
					{image && <span onClick={onResetImage}>기본 이미지로 변경</span>}
				</ProfileImg>

				<ProfileUserInfoCard>
					<div>
						<InputWrapper>
							<ProfileSubTitle>이름</ProfileSubTitle>
							<ProfileUserInfo>
								<Input
									width="long"
									height="long"
									placeholderText="이름을 입력하세요"
									initValue={name}
									changeEvent={onChangeName}
								/>
							</ProfileUserInfo>
						</InputWrapper>
						{!nameValidation && <InvalidMessage>이름은 3글자 이상 8글자 이하여야 합니다</InvalidMessage>}
					</div>
					<div>
						<InputWrapper>
							<ProfileSubTitle>전화번호</ProfileSubTitle>
							<ProfileUserInfo>
								<Input
									width="long"
									height="long"
									placeholderText="휴대폰 번호 11자리를 입력해주세요."
									initValue={mobile}
									changeEvent={onChangeMobile}
								/>
							</ProfileUserInfo>
						</InputWrapper>
						{!mobileValidation && <InvalidMessage>010-xxxx-xxxx 또는 010xxxxxxxx</InvalidMessage>}
					</div>
					<EmailInfoWrapper>
						<InputWrapper>
							<ProfileSubTitle>이메일</ProfileSubTitle>
							<ProfileUserInfo>
								<ProfileUserEmail>{profileInfo.email}</ProfileUserEmail>
							</ProfileUserInfo>
						</InputWrapper>
					</EmailInfoWrapper>
					<div>
						<InputWrapper>
							<ProfileSubTitle>한줄 소개</ProfileSubTitle>
							<ProfileUserInfo>
								<Input
									width="long"
									height="long"
									placeholderText="최대 50자 내로 적어주세요"
									initValue={aboutMe}
									changeEvent={onChangeAboutMe}
								/>
							</ProfileUserInfo>
						</InputWrapper>
						{!aboutMeValidation && <InvalidMessage>최대 50자 내로 적어주세요</InvalidMessage>}
					</div>
				</ProfileUserInfoCard>
			</ProfileUserCard>
			<ProfileEditBottom
				profileInfo={profileInfo}
				name={name}
				mobile={mobile}
				aboutMe={aboutMe}
				image={image}
				stackBucket={stackBucket}
				setStackBucket={setStackBucket}
				nameValidation={nameValidation}
				mobileValidation={mobileValidation}
				aboutMeValidation={aboutMeValidation}
			/>
		</ProfileContainer>
	);
};

export default UserProfileEdit;
