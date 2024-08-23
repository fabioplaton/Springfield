describe('cadastro no site', () => {
    let config
  before(() => {
    cy.fixture('config').then((data) => {
      config = data
    })
  })  
  beforeEach(() => {
    //visitar a página
    cy.visit('https://myspringfield.com/pt/pt')
    cy.get('#onetrust-reject-all-handler').click()
    //clicando para se registrar
    cy.get('.accordion-content > [href="https://myspringfield.com/pt/pt/register"]').click()
  })

  it ('TC01 - registro válido', () => {
    //inserindo seu email
    cy.get('[id="dwfrm_profile_customer_email"]').type(config.EMAIL)
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-email-submit"]').click()
    //verificando se email já é cadastrado no site
    cy.get('body').then(($body) => {
        if ($body.text().includes('O e-mail corresponde a uma conta da Springfield')) {
            // Se a mensagem de e-mail existente aparecer, lidar com isso
            cy.log('e-mail já cadastrado no sistema');    
          } else {
            //inserindo nome
    cy.get('[id="dwfrm_profile_customer_firstname"]').type(config.NOME)
    //inserindo Apelido
    cy.get('[id="dwfrm_profile_customer_lastname"]').type(config.APELIDO)
    //inserindo data de nascimento
    cy.get('[id="dwfrm_profile_customer_birthday"]').type(config.DT_NAS)
    //escolhendo o Género Homem
    cy.get('[for="dwfrm_profile_customer_gender_0"]').click()
    //selecionando receber comunicações
    cy.xpath("//div[@class='termsrow']//div[@class='tsc-input-component js-tsc-input-component tsc-input-component-checkbox tsc-input-component-tooltip tsc-input-size-l']//div[@class='tsc-label-indicator']").click()
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-data-submit"]').click()
    //escolhendo palavra-passe
    cy.get('[id="dwfrm_profile_login_password"]').type(config.PASSWORD)
    //confirmando palavra-passe
    cy.get('[id="dwfrm_profile_login_passwordconfirm"]').type(config.PASSWORD)
    //marcando que concorda com a política de privacidade
    cy.xpath("//label[@for='dwfrm_profile_customer_acceptConditions']//div[@class='tsc-label-indicator']").click()
    //clicando no botão criar conta
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-password-submit"]').click()

          }
    })
    
  })

it ('TC02 - registro sem email', () => {
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-email-submit"]').click()
    //verificando se a mensagem de erro aparece
    cy.xpath("//div[@class='tsc-input-component js-tsc-input-component tsc-input-component-email tsc-input-size-l tsc-input-error-required']//div[@class='tsc-message-required'][normalize-space()='Este campo é obrigatório']")
    .should('contains.text', 'Este campo é obrigatório')
  })

  it ('TC03 - registro sem nome', () => {
    //inserindo seu email
    cy.get('[id="dwfrm_profile_customer_email"]').type(config.OUTROEMAIL)
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-email-submit"]').click()
    //inserindo Apelido
    cy.get('[id="dwfrm_profile_customer_lastname"]').type(config.APELIDO)
    //inserindo data de nascimento
    cy.get('[id="dwfrm_profile_customer_birthday"]').type(config.DT_NAS)
    //escolhendo o Género Homem
    cy.get('[for="dwfrm_profile_customer_gender_0"]').click()
    //selecionando receber comunicações
    cy.xpath("//div[@class='termsrow']//div[@class='tsc-input-component js-tsc-input-component tsc-input-component-checkbox tsc-input-component-tooltip tsc-input-size-l']//div[@class='tsc-label-indicator']").click()
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-data-submit"]').click()
    //verificando mensagem de erro
    cy.get('.tsc-input-error-required > .tsc-validation-messages > .tsc-message-required').should('contains.text', 'Este campo é obrigatório')
  })

  it ('TC04 - registro sem Apelido', () => {
    //inserindo seu email
    cy.get('[id="dwfrm_profile_customer_email"]').type(config.OUTROEMAIL)
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-email-submit"]').click()
    //inserindo nome
    cy.get('[id="dwfrm_profile_customer_firstname"]').type(config.NOME)
    //inserindo data de nascimento
    cy.get('[id="dwfrm_profile_customer_birthday"]').type(config.DT_NAS)
    //escolhendo o Género Homem
    cy.get('[for="dwfrm_profile_customer_gender_0"]').click()
    //selecionando receber comunicações
    cy.xpath("//div[@class='termsrow']//div[@class='tsc-input-component js-tsc-input-component tsc-input-component-checkbox tsc-input-component-tooltip tsc-input-size-l']//div[@class='tsc-label-indicator']").click()
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-data-submit"]').click()
    //verificando mensagem de erro
    cy.get('.tsc-input-error-required > .tsc-validation-messages > .tsc-message-required').should('contains.text', 'Este campo é obrigatório')
  })

  it ('TC05 - registro sem Data de nascimento', () => {
    //inserindo seu email
    cy.get('[id="dwfrm_profile_customer_email"]').type(config.OUTROEMAIL)
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-email-submit"]').click()
    //inserindo nome
    cy.get('[id="dwfrm_profile_customer_firstname"]').type(config.NOME)
    //inserindo Apelido
    cy.get('[id="dwfrm_profile_customer_lastname"]').type(config.APELIDO)
    //escolhendo o Género Homem
    cy.get('[for="dwfrm_profile_customer_gender_0"]').click()
    //selecionando receber comunicações
    cy.xpath("//div[@class='termsrow']//div[@class='tsc-input-component js-tsc-input-component tsc-input-component-checkbox tsc-input-component-tooltip tsc-input-size-l']//div[@class='tsc-label-indicator']").click()
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-data-submit"]').click()
    //verificando mensagem de erro
    cy.get('.tsc-input-error-required > .tsc-validation-messages > .tsc-message-required').should('contains.text', 'Este campo é obrigatório')
  })

  it ('TC06 - registro colocando letras e números no nome', () => {
    //inserindo seu email
    cy.get('[id="dwfrm_profile_customer_email"]').type(config.OUTROEMAIL)
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-email-submit"]').click()
    //inserindo nome
    cy.get('[id="dwfrm_profile_customer_firstname"]').type('Pedro453')
    //inserindo Apelido
    cy.get('[id="dwfrm_profile_customer_lastname"]').type(config.APELIDO)
    //inserindo data de nascimento
    cy.get('[id="dwfrm_profile_customer_birthday"]').type(config.DT_NAS)
    //escolhendo o Género Homem
    cy.get('[for="dwfrm_profile_customer_gender_0"]').click()
    //selecionando receber comunicações
    cy.xpath("//div[@class='termsrow']//div[@class='tsc-input-component js-tsc-input-component tsc-input-component-checkbox tsc-input-component-tooltip tsc-input-size-l']//div[@class='tsc-label-indicator']").click()
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-data-submit"]').click()
    //verificando mensagem de erro
    cy.get('.tsc-input-error-validate > .tsc-validation-messages > .tsc-message-validate > .tsc-message-element').should('contains.text', 'Por favor introduza um primeiro nome válido.')
  })

  it ('TC07 - registro como letras e números no apelido', () => {
    //inserindo seu email
    cy.get('[id="dwfrm_profile_customer_email"]').type(config.OUTROEMAIL)
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-email-submit"]').click()
    //inserindo nome
    cy.get('[id="dwfrm_profile_customer_firstname"]').type(config.NOME)
    //inserindo Apelido
    cy.get('[id="dwfrm_profile_customer_lastname"]').type("lopes123")
    //inserindo data de nascimento
    cy.get('[id="dwfrm_profile_customer_birthday"]').type(config.DT_NAS)
    //escolhendo o Género Homem
    cy.get('[for="dwfrm_profile_customer_gender_0"]').click()
    //selecionando receber comunicações
    cy.xpath("//div[@class='termsrow']//div[@class='tsc-input-component js-tsc-input-component tsc-input-component-checkbox tsc-input-component-tooltip tsc-input-size-l']//div[@class='tsc-label-indicator']").click()
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-data-submit"]').click()
    //verificando mensagem de erro
    cy.get('.tsc-input-error-validate > .tsc-validation-messages > .tsc-message-validate > .tsc-message-element').should('contains.text', 'Por favor introduza um primeiro nome válido.')
  })

  it ('TC08 - registro com data incompleta', () => {
    //inserindo seu email
    cy.get('[id="dwfrm_profile_customer_email"]').type(config.OUTROEMAIL)
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-email-submit"]').click()
    //inserindo nome
    cy.get('[id="dwfrm_profile_customer_firstname"]').type(config.NOME)
    //inserindo Apelido
    cy.get('[id="dwfrm_profile_customer_lastname"]').type(config.APELIDO)
    //inserindo data de nascimento
    cy.get('[id="dwfrm_profile_customer_birthday"]').type('28/12')
    //escolhendo o Género Homem
    cy.get('[for="dwfrm_profile_customer_gender_0"]').click()
    //selecionando receber comunicações
    cy.xpath("//div[@class='termsrow']//div[@class='tsc-input-component js-tsc-input-component tsc-input-component-checkbox tsc-input-component-tooltip tsc-input-size-l']//div[@class='tsc-label-indicator']").click()
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-data-submit"]').click()
    //verificando mensagem de erro
    cy.get('.formInputs > .tsc-input-component-date > .tsc-validation-messages > .tsc-message-validate > .tsc-message-element').should('contains.text', 'O formato não é válido. 01/12/1980')
  })

  it ('TC09 - registro sem senha e sem confirmação e sem aceitar a política de privacidade', () => {
    //inserindo seu email
    cy.get('[id="dwfrm_profile_customer_email"]').type(config.OUTROEMAIL)
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-email-submit"]').click()
    //inserindo nome
    cy.get('[id="dwfrm_profile_customer_firstname"]').type(config.NOME)
    //inserindo Apelido
    cy.get('[id="dwfrm_profile_customer_lastname"]').type(config.APELIDO)
    //inserindo data de nascimento
    cy.get('[id="dwfrm_profile_customer_birthday"]').type(config.DT_NAS)
    //escolhendo o Género Homem
    cy.get('[for="dwfrm_profile_customer_gender_0"]').click()
    //selecionando receber comunicações
    cy.xpath("//div[@class='termsrow']//div[@class='tsc-input-component js-tsc-input-component tsc-input-component-checkbox tsc-input-component-tooltip tsc-input-size-l']//div[@class='tsc-label-indicator']").click()
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-data-submit"]').click()
    //marcando que concorda com a política de privacidade
    cy.xpath("//label[@for='dwfrm_profile_customer_acceptConditions']//div[@class='tsc-label-indicator']").click()
    //clicando no botão criar conta
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-password-submit"]').click()
    //verificando mensagem de erro
    cy.get('.tsc-input-error-required > .tsc-validation-messages > .tsc-message-required').should('contains.text', 'Este campo é obrigatório')

  })

  it ('TC10 - registro sem confirmação de senha e sem a política de privacidade', () => {
    //inserindo seu email
    cy.get('[id="dwfrm_profile_customer_email"]').type(config.OUTROEMAIL)
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-email-submit"]').click()
    //inserindo nome
    cy.get('[id="dwfrm_profile_customer_firstname"]').type(config.NOME)
    //inserindo Apelido
    cy.get('[id="dwfrm_profile_customer_lastname"]').type(config.APELIDO)
    //inserindo data de nascimento
    cy.get('[id="dwfrm_profile_customer_birthday"]').type(config.DT_NAS)
    //escolhendo o Género Homem
    cy.get('[for="dwfrm_profile_customer_gender_0"]').click()
    //selecionando receber comunicações
    cy.xpath("//div[@class='termsrow']//div[@class='tsc-input-component js-tsc-input-component tsc-input-component-checkbox tsc-input-component-tooltip tsc-input-size-l']//div[@class='tsc-label-indicator']").click()
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-data-submit"]').click()
    //escolhendo palavra-passe
    cy.get('[id="dwfrm_profile_login_password"]').type(config.PASSWORD)
    //clicando no botão criar conta
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-password-submit"]').click()
    //verificando mensagem de erro
    cy.get('.tsc-input-error-required > .tsc-validation-messages > .tsc-message-required').should('contains.text', 'Este campo é obrigatório')
  })

  it ('TC11 - registro sem política de privacidade', () => {
    //inserindo seu email
    cy.get('[id="dwfrm_profile_customer_email"]').type(config.OUTROEMAIL)
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-email-submit"]').click()
    //inserindo nome
    cy.get('[id="dwfrm_profile_customer_firstname"]').type(config.NOME)
    //inserindo Apelido
    cy.get('[id="dwfrm_profile_customer_lastname"]').type(config.APELIDO)
    //inserindo data de nascimento
    cy.get('[id="dwfrm_profile_customer_birthday"]').type(config.DT_NAS)
    //escolhendo o Género Homem
    cy.get('[for="dwfrm_profile_customer_gender_0"]').click()
    //selecionando receber comunicações
    cy.xpath("//div[@class='termsrow']//div[@class='tsc-input-component js-tsc-input-component tsc-input-component-checkbox tsc-input-component-tooltip tsc-input-size-l']//div[@class='tsc-label-indicator']").click()
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-data-submit"]').click()
    //escolhendo palavra-passe
    cy.get('[id="dwfrm_profile_login_password"]').type(config.PASSWORD)
    //confirmando palavra-passe
    cy.get('[id="dwfrm_profile_login_passwordconfirm"]').type(config.PASSWORD)
    //clicando no botão criar conta
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-password-submit"]').click()
    //verificando mensagem de erro
    cy.get('.tsc-input-error-required > .tsc-validation-messages > .tsc-message-required').should('contains.text', 'Este campo é obrigatório')
  })

  it ('TC12 - registro senha < 8 caracteres', () => {
    //inserindo seu email
    cy.get('[id="dwfrm_profile_customer_email"]').type(config.OUTROEMAIL)
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-email-submit"]').click()
    //inserindo nome
    cy.get('[id="dwfrm_profile_customer_firstname"]').type(config.NOME)
    //inserindo Apelido
    cy.get('[id="dwfrm_profile_customer_lastname"]').type(config.APELIDO)
    //inserindo data de nascimento
    cy.get('[id="dwfrm_profile_customer_birthday"]').type(config.DT_NAS)
    //escolhendo o Género Homem
    cy.get('[for="dwfrm_profile_customer_gender_0"]').click()
    //selecionando receber comunicações
    cy.xpath("//div[@class='termsrow']//div[@class='tsc-input-component js-tsc-input-component tsc-input-component-checkbox tsc-input-component-tooltip tsc-input-size-l']//div[@class='tsc-label-indicator']").click()
    //clicando no botão seguinte
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-data-submit"]').click()
    //escolhendo palavra-passe
    cy.get('[id="dwfrm_profile_login_password"]').type('1234567')
    //confirmando palavra-passe
    cy.get('[id="dwfrm_profile_login_passwordconfirm"]').type('1234567')
    //marcando que concorda com a política de privacidade
    cy.xpath("//label[@for='dwfrm_profile_customer_acceptConditions']//div[@class='tsc-label-indicator']").click()
    //clicando no botão criar conta
    cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-register-password-submit"]').click()
    //verificando mensagem de erro
    cy.get('.login-step.login-step-3 > .tsc-input-component-help > .tsc-validation-messages > .tsc-message-validate').should('contains.text', 'Formato de senha inválido. Deve conter no mínimo 8 caracteres.')
  })

})

describe('Login', () => {
    let config
    before(() => {
        cy.fixture('config').then((data) => {
          config = data
        })
      })
      
      beforeEach(() => {
        //visitar a página
        cy.visit('https://myspringfield.com/pt/pt')
        cy.get('#onetrust-reject-all-handler').click()
        //clicando para se registrar
        cy.get('[href="https://myspringfield.com/pt/pt/myprofile"]').click()
      })
    
    it('TC01 - login com sucesso', () => {
        //inserindo os dados de email
        cy.get('[id="dwfrm_login_username"]').type(config.EMAIL)
        //clicando no botão continuar
        cy.get(':nth-child(1) > .formSubmitBtn').click()
        //inserindo os dados da palavra-passe
        cy.get('#dwfrm_login_password').type(config.PASSWORD)
        //clicando no botão iniciar sessão
        cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-login-checkpassword"]').click()
        //verificando se estou na página dados pessoais pela url
        cy.url().should('eq', 'https://myspringfield.com/pt/pt/mydata')
        //verificando se estou na página dados pessoas pelo título da página
        cy.get('.scopeTitle').should('have.text', 'Dados pessoais')
    })
    
    it('TC02 - login sem email', () => {
        //clicando no botão continuar
        cy.get(':nth-child(1) > .formSubmitBtn').click()
        //verificando se estou na página dados pessoas pelo título da página
        cy.get('.login-step.login-step-1 > .tsc-input-component > .tsc-validation-messages > .tsc-message-required').should('contains.text', 'Este campo é obrigatório')
    })      

    it('TC03 - login email sem o @', () => {
        //inserindo os dados de email
        cy.get('[id="dwfrm_login_username"]').type('platonfabio')
        //clicando no botão continuar
        cy.get(':nth-child(1) > .formSubmitBtn').click()
        //verificando se estou na página dados pessoas pelo título da página
        cy.get('.login-step.login-step-1 > .tsc-input-component > .tsc-validation-messages > .tsc-message-validate > .tsc-message-element').should('contains.text', 'Endereço de email inválido')
    })      

    it('TC04 - login email sem o domínio', () => {
        //inserindo os dados de email
        cy.get('[id="dwfrm_login_username"]').type('platonfabio@hotmail')
        //clicando no botão continuar
        cy.get(':nth-child(1) > .formSubmitBtn').click()
        //verificando se estou na página dados pessoas pelo título da página
        cy.get('.login-step.login-step-1 > .tsc-input-component > .tsc-validation-messages > .tsc-message-validate > .tsc-message-element').should('contains.text', 'Endereço de email inválido')
    })      

    it('TC05 - login sem senha', () => {
        //inserindo os dados de email
        cy.get('[id="dwfrm_login_username"]').type(config.EMAIL)
        //clicando no botão continuar
        cy.get(':nth-child(1) > .formSubmitBtn').click()
        //clicando no botão iniciar sessão
        cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-login-checkpassword"]').click()
        //verificando mensagem de erro
        cy.get('.login-step.login-step-1 > .tsc-input-component > .tsc-validation-messages > .tsc-message-validate > .tsc-message-element').should('contains.text', 'Endereço de email inválido')   
    })      

    it('TC06 - login com senha errada', () => {
        //inserindo os dados de email
        cy.get('[id="dwfrm_login_username"]').type(config.EMAIL)
        //clicando no botão continuar
        cy.get(':nth-child(1) > .formSubmitBtn').click()
        //inserindo os dados da palavra-passe
        cy.get('#dwfrm_login_password').type('teste1234')
        //clicando no botão iniciar sessão
        cy.get('[class="formSubmitBtn tsc-btn tsc-btn-l tsc-btn-solid-dark tsc-btn-w-fluid gi-login-checkpassword"]').click()
        cy.get('.formInputs > .tsc-input-component > .tsc-validation-messages > .tsc-message-validate > .tsc-message-element').should('contains.text', 'A palavra-passe está incorreta')
    })      
})

describe('testando banners do site', ()=> {
    let config
    before(() => {
        cy.fixture('config').then((data) => {
          config = data
        })
      })
      
      beforeEach(() => {
        //visitar a página
        cy.visit('https://myspringfield.com/pt/pt')
        //clicando no popup cookies
        cy.get('#onetrust-reject-all-handler').click()
    })
    it('TC01 - testando banner +10% extra - Mulher', () => {
        //clicando no botão mulher
        cy.xpath("//a[@href='/pt/pt/mulher/promotions/ultimos-dias']").click()
        //verificando se estou na página correta
        cy.get('.GZPJkEj38NMMmdk_piKD').should('contains.text', 'ÚLTIMOS DIAS')
    })

    it('TC02 - testando banner +10% extra - Homem', () => {
        //clicando no botão homem
        cy.xpath("//a[@href='/pt/pt/homem/promotion/ultimos-dias']").click()
        //verificando se estou na página correta
        cy.get('.GZPJkEj38NMMmdk_piKD').should('contains.text', 'ÚLTIMOS DIAS ATÉ -70%')
    })

    it('TC03 - Jack&Jones - Mulher', () => {
      //clicando no botão mulher
      cy.xpath("//a[@href='/pt/pt/mulher/jack-jones']").click()
      //verificando se está no site da promoção
      cy.url().should('eq', 'https://myspringfield.com/pt/pt/mulher/jack-jones')
    })

    it('TC04 - Jack&Jones - Homem', () => {
      //clicando no botão homem
      cy.xpath("//a[@href='/pt/pt/homem/jack-jones']").click()
      cy.url().should('eq', 'https://myspringfield.com/pt/pt/homem/jack-jones')
      cy.url().should('contains', 'homem')
      //clicar no botão carregar mais
      cy.get('.GQc3pRCpEPN5Bz3iADeR > .e0mJkeeuX_RrLGuwH4uC').click()
    })

    it('TC05 - springfield club junta-te ao club', () => {
      //clicar no botão torna-te um sócio
      cy.get("a[aria-label='TORNAR-TE']").click()
      //clicar no banner negar cookies
      cy.get('.denegar').click()
      //verificar se está na página de cadastro de sócio
      cy.get(".brand").should('be.visible')
      //preenchendo o campo nome 
      cy.get('[name="name"]').type(config.NOME)
      //preenchendo o campo primeiro apelido 
      cy.get('[name="surname"]').type(config.APELIDO)
      //preenchendo o campo email
      cy.get('[name="email"]').type(config.EMAIL)
      //preenchendo o campo data de nascimento
      cy.get('[name="birthdate"]').type(config.DT_NAS)
      //preenchendo o campo BI/CC
      cy.get('[name="DNI"]').type(config.BI)
      //preenchendo o nome telemóvel
      cy.get('[name="phone"]').type(config.CONTATO)
      //preenchendo o código postal 
      cy.get('[name="cpostal"]').type(config.CODIGOPOSTAL)
      //selecionando o sexo
      cy.get('[for="man"]').click()
      //selecionando que aceito as condições legais
      cy.get('#legal').click()
      //apertando o botão enviar 
      cy.get('#enviar').click()
    })

})

describe('Realizando uma compra no site', () => {
  let config
    before(() => {
        cy.fixture('config').then((data) => {
          config = data
        })
      })
      
      beforeEach(() => {
        //visitar a página
        cy.visit('https://myspringfield.com/pt/pt')
        //clicando no popup cookies
        cy.get('#onetrust-reject-all-handler').click()
    })

    it('TC01 - realizando uma compra no site até o final', () => {
      //clicando na lupa para pesquisar
      cy.get('.navigation-search > .menu-links').click({ force: true })
      //pesquisando por bermuda
      cy.get('[name="q"]').type('bermuda{enter}')
      //escolhendo bermuda vaqueira regular ultra leve
      cy.xpath("//img[@alt='Springfield Bermuda vaqueira regular ultra leve azul aço']").click()
      //escolhendo tamanho 38
      cy.get('[for="mainSizeID38"]').click()
      //adicionando ao carrinho
      cy.get('.productAddToCartGrid > .js-addToCartButton').click()
      cy.wait(3000)
      //fechando carrinho para continuar comprando 
      cy.get(".tndmIcon.pN_O7KtfK9hi9EJeNw2N").click()
      //clicando no menu
      cy.xpath("//button[@class='megadrop-trigger-mobile js-megadrop-link']//*[name()='svg']").click({ force: true })
      //selecionando a categoria homem
      cy.get(':nth-child(2) > .main-category-link').click()
      //selecionando roupa no submenu
      cy.get('.show-submenu > .megadrop-overlay > .subcategories-list > :nth-child(1) > .subcategory-item > .accordion-header').click()
      //selecionando t-shirt
      cy.get('.show-submenu > .megadrop-overlay > .subcategories-list > :nth-child(1) > .subcategory-item > .subsubcategories-list > :nth-child(5) > a').click()
      //selecionando uma camisa 
      cy.get(':nth-child(1) > .nmLhfQy3DufpkLp9Axye').click()
      //selecionando o tamanho
      cy.get(':nth-child(6) > .item__label').click()
      //clicando em adicionar ao carrinho
      cy.get('.productAddToCartGrid > .js-addToCartButton').click()
      cy.wait(3000)
      //removendo a bermuda do carrinho de compra
      cy.xpath('//*[@data-pid="00182031438" and @data-action-type="remove"]').click()
      cy.wait(3000)
      //clicando no botão concluir compra
      cy.get('.js-minicart-footer-button').click()
      //fazendo login
      cy.get('#dwfrm_expresscheckoutlogin_username').type(config.EMAIL)
      cy.get('#dwfrm_expresscheckoutlogin_password').type(config.PASSWORD)
      cy.get('#submitLoginUserFormButton').click()
      //escolhendo forma de envio
      cy.get('#delivery-home > .toggle-selector').click()
      //preenchendo dados do pedido
      cy.get("div[class='overflow-scroll'] h3").then(($h3) => {
        const texto = $h3.text().trim()
        if (texto === "Enviar para:") {
          cy.get('#continueToPaymentButton').click()
          } else {
            cy.get('#dwfrm_expresscheckoutsingleshipping_shippingAddress_addressFields_firstName').type(config.NOME)
            cy.get('#dwfrm_expresscheckoutsingleshipping_shippingAddress_addressFields_lastName').type(config.APELIDO)
            cy.get('#dwfrm_expresscheckoutsingleshipping_shippingAddress_addressFields_address1').type(config.ENDERECO)
            cy.get('#dwfrm_expresscheckoutsingleshipping_shippingAddress_addressFields_address2').type(config.COMPLEMENTO)
            cy.get('#dwfrm_expresscheckoutsingleshipping_shippingAddress_addressFields_postal').type(config.CODIGOPOSTAL)
            cy.get('#dwfrm_expresscheckoutsingleshipping_shippingAddress_addressFields_city').type(config.LOCALIDADE)
            cy.get('#dwfrm_expresscheckoutsingleshipping_shippingAddress_addressFields_states_state').type(config.LOCALIDADE)
            cy.get('#dwfrm_expresscheckoutsingleshipping_shippingAddress_addressFields_phonenumber').type(config.CONTATO)
            cy.get('#continueToPaymentButton').click()
          }
      })
      cy.get('.col--1 > .tdsCheckbox > :nth-child(2)').click()
      cy.get('#dwfrm_expresscheckoutbilling_customerTaxId').type(config.NIF)
      cy.get(':nth-child(11) > .col > .tdsCheckbox > :nth-child(2) > .tdsCheckboxCheckmark').click()
    })
})