/*************************************************************
 * Simulation of a Custom OTP Form 
 * 
 * @name (Anyanwu_Benedict_Chukwuemeka)
 * @version (v0.01)
 *************************************************************/


    // Verification function
    function verification(destination = 'https://acbennny.netlify.app')
    {
        const verCodeBdr = document.createElement("div");
        verCodeBdr.classList.add("vercode_bdr");
        verCodeBdr.innerHTML = 
        ` 
            <!-- preloader -->
            <div class="ver_loader">
                <span class="vl_1">
                    <span class="vl_2"></span>
                </span>
                <p class="vl_note">
                    <span id="loader_ctnt">Processing</span>
                    <span id="vl_note_loader">
                        <i class="fa-solid fa-circle" style="--i:1"></i>
                        <i class="fa-solid fa-circle" style="--i:2"></i>
                        <i class="fa-solid fa-circle" style="--i:3"></i>
                    </span>
                </p>
            </div>

            <!-- background -->
            <div class="vercode_bcg"></div>

            <!-- content -->
            <div class="vercode_box">
                <div class="email_verForm"  id="email_form">

                    <!-- close box -->
                    <div class="gen_Style genIconBox close_verification_box">
                        <i class="fa-solid fa-xmark genIcon"></i>
                    </div>

                    <div class="ask_for_ver">
                        <h4>Verification</h4>
                        <p>
                            <span id="ver_sub_title">You will need to be verified before you can continue</span>
                        </p>
                    </div>

                    <!-- Validation field -->
                    <span class="typeincode">
                        <!-- <h4>An OTP has been sent to your email</h4> -->
                        <span class="input_verCode_num">
                            <input id="input_verCode" type="text" placeholder="Enter Code here"/>
                        </span>
                        <p>Code expires in <span id="time_countdown">300</span>seconds</p>
                    </span>

                    <!-- set the reply-to address -->
                    <span class="ver_req_box">
                        <input id="submit_form" type="button" value="Get Code" class="" />
                        <input id="submit_verCode" type="button" value="Verify" class="hideBtn" />
                        <input id="request_verCode" type="button" value="Try Again" class="hideBtn" />
                        <p class="ver_sent_warn"></p>
                    </span>
                
                    <!-- Form Provider -->
                    <p class="form_provider">
                        <a href="${destination}" target="_blank">Made with 🧡 by acbennny</a>
                    </p>
                </div>
            </div>
        `;
        document.body.appendChild(verCodeBdr);

        const verCodeBox_loader = verCodeBdr.querySelector(".ver_loader");
        const ver_loader_note_ctnt = verCodeBox_loader.querySelector("#loader_ctnt");
        const close_verCodeBdr = verCodeBdr.querySelector(".gen_Style");
        const sendVerCode = verCodeBdr.querySelector(".ver_req_box #submit_form");
        const valVerCode = verCodeBdr.querySelector(".ver_req_box #submit_verCode");
        const reqVerCode = verCodeBdr.querySelector(".ver_req_box #request_verCode");
        const verCodeBox = verCodeBdr.querySelector('.ask_for_ver');
        const verCodeTitle = verCodeBox.querySelector('.ask_for_ver h4');
        const verCodeSubTitle = verCodeBox.querySelector('.ask_for_ver p');
        const verCodeSubTitleCtnt = verCodeSubTitle.querySelector('#ver_sub_title');
        const enterOtp = verCodeBdr.querySelector(".typeincode");
        const enterOtpInput = enterOtp.querySelector("#input_verCode");
        const verCodeTimer = enterOtp.querySelector('p #time_countdown');
        let timer;

        // if box is closed , it opens
        if(!(verCodeBdr.classList.contains("active")))
        {
            document.body.classList.add('off_Flow');
            document.body.classList.remove('on_Flow');
            verCodeBdr.classList.add("active");
            verCodeBox_loader.classList.add("active");
            verCodeLoader();
            emailVerCode();
        }

        // Closes the verification box
        close_verCodeBdr.addEventListener("click" , () => 
        {
            if(confirm(" As per privacy policies, closing the form will reload the current page. \n Any unsaved changes will be lost.")) window.location.reload();
        });

        // Removes preloader after "5" seconds
        function verCodeLoader()
        {
            verCodeBox_loader.classList.add("active");

            if((verCodeBox_loader.classList.contains("active")))
            {
                setTimeout(() => verCodeBox_loader.classList.remove("active") , 1250);
            }
        }

        // Generate OTP num
        function generateOTP()
        {
            const len = 8;
            let otp = '';
            const digits = '0123456789';

            for (let i = 0; i < len; i++)
            {
                otp += digits[Math.floor(Math.random() * 10)];
            }
            return otp;
        }
        
        // Carries the sending of email
        function emailVerCode()
        {
            const thisVercart = generateOTP();
            const timePeriod = 300;
            const ntcPrd_fixed = Math.round(timePeriod / 10);

            function verTimer()
            {
                let sec = timePeriod;
                let ntcPrd_temp = ntcPrd_fixed;

                timer = setInterval(() =>
                {
                    sec--;
                    ntcPrd_temp--;

                    // Displays timer in page
                    verCodeTimer.textContent = sec;
                    
                    // Once timer hits "0", prompt User to request a new OTP
                    if(sec <= 0)
                    {
                        clearInterval(timer);
                        verCodeSubTitleCtnt.textContent = "Your code has expired. You will need to request a new one";
                        enterOtp.classList.remove("active");
                        valVerCode.classList.add("hideBtn");
                        reqVerCode.classList.remove("hideBtn");
                        verCodeTimer.textContent = "300";
                    }

                    // Show the user's test OTP periodically
                    if((sec > 0) && (ntcPrd_temp <= 0))
                    {
                        ntcPrd_temp = ntcPrd_fixed;
                        setTimeout(() => 
                        {
                            if(confirm(`Your code is\n${thisVercart}\nCopy to clipboard?`)) navigator.clipboard.writeText(thisVercart);
                        }, 25);
                    }
                }, 1000);
            }

            // Makes send button active
            if((sendVerCode.classList.contains("hideBtn")))
            {
                sendVerCode.classList.remove("hideBtn");
                reqVerCode.classList.add("hideBtn");
            }

            // Send Email
            sendVerCode.onclick = () => 
            {
                // Removes an submit button and Replaces with validation button
                sendVerCode.classList.add("hideBtn");
                verCodeBox_loader.classList.add("active");

                if((verCodeBox_loader.classList.contains("active")))
                {
                    let loadtimeVerSuccess = 10;
                    let sec = loadtimeVerSuccess;
                    let verSuccesstimer = setInterval(() =>
                    {
                        sec--;
                        if(sec == 9)
                        {
                            ver_loader_note_ctnt.textContent = "Generating code";
                        }
                        if(sec == 4)
                        {
                            ver_loader_note_ctnt.textContent = "Sending Code";
                        }
                        if(sec == 1)
                        {
                            ver_loader_note_ctnt.textContent = "Success";
                        }
                        if(sec == 0)
                        {
                            clearInterval(verSuccesstimer);
                            enterOtp.classList.add("active");
                            valVerCode.classList.remove("hideBtn");
                            verCodeBox_loader.classList.remove("active");
                            ver_loader_note_ctnt.textConten = "Processing";
                            verCodeTitle.textContent = "Verification";
                            
                            // Changes sub-title to "An OTP has been sent to your email";
                            verCodeSubTitleCtnt.textContent = "An OTP has been sent to your email";

                            // Starts timer
                            verTimer();
                        }
                    }, 1000);
                }
            };

            
            // Validating the OTP
            let invalidVerAttempts = 0;
            const enterOtp_Condition = new RegExp("^[a-zA-Z0-9]*$");
            enterOtpInput.ariaAutoComplete = "none";
            enterOtpInput.autoComplete = "off";
            enterOtpInput.autoCapitalize = "off";
            enterOtpInput.autoCorrect = "off";
            enterOtpInput.spellCheck = false;
            enterOtpInput.ariaHasPopup = false;

            enterOtpInput.onbeforeinput = (event) => 
            {
                if (event.data != null && !(enterOtp_Condition.test(event.data))) 
                    event.preventDefault();
            };

            // Click to Validate
            valVerCode.onclick = () => 
            {
                // Assigns last value to avraible
                let currValue = enterOtpInput.value.toString().trim();

                // Makes preloader active
                verCodeBox_loader.classList.add("active");

                // Changes text Note on preloader to "verifying"
                ver_loader_note_ctnt.textContent = "Verifying";

                // Compares value inputed after 2.5 seconds
                setTimeout(()=> 
                {
                    // If user's inputeed is correct, this occurs
                    if(currValue == thisVercart)
                    {
                        // Clears timer
                        clearInterval(timer);

                        // Sequence of messages displayed at differnet points ove a second period before is redirected to homepage
                        setTimeout(() =>
                        {
                            let loadtimeVerSuccess = 20;
                            let seconds = loadtimeVerSuccess;
                            let verSuccesstimer = setInterval(() =>
                            {
                                seconds--;
                                if(seconds == 19)
                                {
                                    ver_loader_note_ctnt.textContent = "Verified";
                                }
                                if(seconds == 17)
                                {
                                    ver_loader_note_ctnt.textContent = "Creating Account";
                                }
                                if(seconds == 7)
                                {
                                    ver_loader_note_ctnt.textContent = "Account Created";
                                }
                                if(seconds == 5)
                                {
                                    ver_loader_note_ctnt.textContent = "Redirecting";
                                }
                                if(seconds == 0)
                                {
                                    clearInterval(verSuccesstimer);
                                    document.body.removeChild(verCodeBdr);
                                    setTimeout(() => 
                                    {
                                        if((confirm(`Thank you for viewing this project.\nHit the button to view my other projects`))) window.open(destination, '_self');
                                    } , 1000);
                                }
                            }, 1000);
                        } ,2500);
                    }
                    // If User makes more than three (3) wrong attempts this occurs
                    else if(invalidVerAttempts >= 3)
                    {
                        // Clears timer
                        clearInterval(timer);
                        ver_loader_note_ctnt.textContent = "Processing";

                        // Let user know they've made too many attempts
                        verCodeSubTitleCtnt.textContent = "You have made too many incorrect attempts";

                        // The input field for user ver code is hidden
                        enterOtp.classList.remove("active");

                        // The try again button is made active
                        valVerCode.classList.add("hideBtn");

                        // The verify button is hidden
                        reqVerCode.classList.remove("hideBtn");

                        // Removes preloader after 2.5seconds
                        setTimeout(() => verCodeBox_loader.classList.remove("active") , 2500);
                    }
                    // If user's input is incorrect, this occurs
                    else
                    {
                        // Increment the invalid attempt counter
                        invalidVerAttempts++;

                        // Sets preloader text note to "invalid code"
                        ver_loader_note_ctnt.textContent = "Invalid Code";

                        // Removes preloader after 2.5seconds
                        setTimeout(() => verCodeBox_loader.classList.remove("active") , 2500);
                    }
                },2500);
            };
        }

        // Requesting new code
        reqVerCode.addEventListener("click" , emailVerCode);
    }
