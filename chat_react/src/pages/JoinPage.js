import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
let localhost = 'http://127.0.0.1:8087'; //localhost+'/api/v1/join'

function JoinPage(){
    return(
        <div>
            <div className="layout">
				<div className="main order-md-2">
					<div className="start">
						<div className="container">
							<div className="col-md-12">
								<div className="content">
									<h1>회원가입</h1>
									<div className="third-party">
										<Button variant="btn item bg-blue">
											<i className="material-icons">pages</i>
										</Button>
										<Button variant="btn item bg-teal">
											<i className="material-icons">party_mode</i>
										</Button>
										<Button variant="btn item bg-purple">
											<i className="material-icons">whatshot</i>
										</Button>
									</div>
									<form className="signup" method="post" action={process.env.REACT_APP_HOST_URL+"/api/v1/join"} encType="multipart/form-data">
										
										<div className="form-group">
											<input type="text" id="inputName" className="form-control" placeholder="Username" name="username" required></input>
											<Button variant="btn icon"><i className="material-icons">person_outline</i></Button>
										</div>
										<div className="form-group">
											<input type="password" id="inputPassword" className="form-control" placeholder="Password" name="password" required></input>
											<Button variant="btn icon"><i className="material-icons">lock_outline</i></Button>
										</div>
										<div className="form-group">
											<input type="file" className="custom-file-input" id="customFile" name="file" required></input>
											<label className="custom-file-label" htmlFor="customFile">프로필 사진</label>
										</div>
										<div className="form-group">
											<label htmlFor="lang" className="form-label">사용하는 언어</label>
											<select className="form-select" aria-label="Default select example" id="lang" name="lang" required>
												<option selected value="ko">한글</option>
												<option value="en">English</option>
											</select>
											
										</div>
										
										<Button type="submit" className="btn button">Sign Up</Button>
										<div className="callout">
											<span>Already a member? <Link to='/login'>Sign In</Link></span>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="aside order-md-1">
					<div className="container">
						<div className="col-md-12">
							<div className="preference">
								<h2>Welcome Back!</h2>
								<p>이미 가입하셨나요? 그럼 로그인해 서로 채팅해요~</p>
                                <Link to='/login' className="btn button">Sign In</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>
        
    );
}

export default JoinPage;