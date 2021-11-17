import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

import Button from '../Button';
import Input from '../Input';

import useInput from '../../../hooks/useInput';
import { emailValid } from '../../../utils/validations';

import {
	LoginTitle,
	EmailLoginForm,
	LoginModalContainer,
	Line,
	GoogleLoginBtn,
	GithubLoginBtn,
	GithubIcon,
	GoogleIcon,
	LoginGuideText,
	LoginSuccessMessage,
	EmailLoginContainer,
	LoginErrorMessage,
} from './styles';

const LoginModal = (): JSX.Element => {
	const history = useHistory();
	const [email, onChangeEmail] = useInput<string>('');
	const [changeGuide, setChangeGuide] = useState<boolean>(false);
	const [loginMessage, setLoginMessage] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<boolean>(false);

	useEffect(() => {
		return () => {
			history.push({ state: { isLogged: false } });
		};
	}, []);

	const onChangeGuideText = useCallback((): string => {
		return changeGuide ? '회원가입' : '로그인';
	}, [changeGuide]);

	const onSubmitEmail = (): void => {
		if (email.trim() === '') {
			return;
		}

		const emailCheck = emailValid(email);

		if (!emailCheck) {
			setErrorMessage(true);
		} else {
			axios.post(`http://localhost:4000/sendEmail`, { email });
			setErrorMessage(false);
			setLoginMessage(true);
		}
	};

	const onLogin = useCallback(
		(type: string): void => {
			window.localStorage.setItem('location', `${history.location.pathname}${history.location.search}`);

			if (type === 'google') {
				window.location.assign(
					`https://accounts.google.com/o/oauth2/auth?client_id=399420936944-704duo9e92m3kqmpfom8hv1qcgpa9inf.apps.googleusercontent.com&redirect_uri=http://https://optmization.d2tqcj2zwv4epr.amplifyapp.com/loginloading&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email&approval_prompt=force&access_type=offline`,
				);
			}
			if (type === 'github') {
				window.location.assign(`${process.env.REACT_APP_GITHUB_LOGIN_URL}`);
			}
			if (type === 'email') {
				onSubmitEmail();
			}
		},
		[email],
	);

	return (
		<LoginModalContainer>
			<LoginTitle>{onChangeGuideText()}</LoginTitle>
			<EmailLoginForm>
				<EmailLoginContainer>
					<Input
						width="short"
						height="long"
						placeholderText="이메일을 입력하세요."
						initValue={email}
						changeEvent={onChangeEmail}
						keyEvent={(e: KeyboardEvent<Element>) => e.key === 'Enter' && onSubmitEmail()}
					/>
					<Button size="small" clickEvent={() => onLogin('email')}>
						{onChangeGuideText()}
					</Button>
				</EmailLoginContainer>
				{loginMessage && <LoginSuccessMessage>해당 메일에 인증번호가 전송되었습니다</LoginSuccessMessage>}
				{errorMessage && <LoginErrorMessage>이메일 주소를 정확히 입력해주세요</LoginErrorMessage>}
			</EmailLoginForm>
			<Line />
			<GoogleLoginBtn onClick={() => onLogin('google')}>
				<GoogleIcon />
				구글 이메일로 로그인
			</GoogleLoginBtn>
			<GithubLoginBtn onClick={() => onLogin('github')}>
				<GithubIcon />
				깃허브 아이디로 로그인
			</GithubLoginBtn>
			<LoginGuideText>
				{changeGuide ? '계정이 이미 있으신가요?' : '아직 회원이 아니신가요?'}
				<span onClick={() => setChangeGuide(!changeGuide)}>회원가입</span>
			</LoginGuideText>
		</LoginModalContainer>
	);
};

export default LoginModal;
