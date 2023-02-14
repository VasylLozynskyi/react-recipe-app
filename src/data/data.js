export const Categories = [
    "All", "Indian", "Italian", "Asian", "Chinese", "Local Dish", "vegetables", "Cereal", "Fruit", "Protein"
];

export const rateButton = [
    5, 4, 3, 2, 1
]

export const dataSite = {
    firstPage: {
        subMainText: "100K+ Premium Recipe",
        title: "Get Cooking",
        subTitle: "Simple way to find Tasty Recipe",
        link: "Start Cooking",
    },
    loginPage: {
        title: "Hello,",
        subTitle: "Welcome Back!",
        blockbtn: {
            text: "Don’t have an account?",
            link: "Sign up",
        },
        formSignIn: {
            title: "Login",
            placeholderLogin: "login (email)",
            placeholderPassword: "Password",
            buttonIn: "Sign in",
            textGuest: "Login as ",
            nameGuest: "Guest",
            textForgot: "Forgot password?",
            buttonCloseErr: "X",
        },
    },
    signUpPage: {
        title: "Create an account",
        subTitle: "Let’s help you set up your account, it won’t take long.",
        blockbtn: {
            text: "Already a member?",
            link: "Sign in"
        },
        formSignUp: {
            title: "Sign Up",
            placeholderLogin: "login (email)",
            placeholderPassword: "Password",
            placeholderConfirm: "Confirm Password",
            buttonName: "Sign Up",
            buttonCloseErr: "X",
        },
    },
    home: {
        loginEmptyPage: {
            title: "You must first to",
            link: "Login",
        },
        emptyPage: {
            title: "This page does not exist",
            subTitleStart: "Please return to",
            subtitleEnd: "page",
            link: "home",
        },
        header: {
            titleHello: "Hello",
            textHello: "What are you cooking today?",
            linkHome: "Home",
            linkRecipes: "Recipes",
            linkLogin: "Login",
            linkProfile: "Profile",
        },
        recipesPage: {
            title: "Recipes",
            buttonNameFilter: "Filter",
            dataFilter: {
                title: "Filter Search",
                subTitle1: "Time",
                subTitle2: "Rate",
                subTitle3: "Category",
                buttonSubmit: "Filter",
            },
            noRecipes: "no recipes in filter",
        },
        recipePage: {
            buttonSetting: "...",
            minsText: "mins",
            buttonFollow: "Follow",
            textIngredients: "Ingredients",
            textProcedure: "Procedure",
            textReviews: "Reviews",
            gramsText: "grams",
            zeroIngredient: "this recipe don't have ingredients",
            zeroProcedure: "this recipe don't have procedure",
            zeroReviews: "this recipe don't have reviews",
            stepText: "step",
            popupUpdateRecipe: "Update Recipe",
            popupRateRecipe: "Rate recipe",
            popupLinkShare: "Share",
            popupLinkAddReview: "Add review",
        },
        createRecipePage: {
            title: "New Recipe",
            labelName: "Recipe name",
            labelCategory: "Category",
            labelTimePrepare: "Time to prepare (mins)",
            labelIngredient: "Ingredients",
            addIngredient: {
                button: "Add ingredient",
                placeholderText: "Enter ingredient",
                placeholderNumber: "Enter weight (grams)",
            },
            buttonDelete: "❌",
            labelProcedure: "Procefure",
            addProcedure: {
                step: "step",
                noProcedure: "No procedure in the list",
                button: "Add new step",
            },
            labelFile: "photo",
            buttonSubmitName : "Submit"
        },
        settingPage: {
            title: "Settings",
            labelName: "Name",
            labelPosition: "Position",
            labelAboutMe: "About Me",
            labelPhoto: "Photo",
            buttonName: "Change",
            buttonLogOut: "Logout",
        },
        profilePage: {
            title: "Profile",
            btnSettings: "Settings",
            countProfileName1: "Recipe",
            countProfileName2: "Followers",
            countProfileName3: "Following",
            btnNameAddREcipe: "Add Recipe",
            btnsTabs: {
                tabName1: "Recipes", 
                tabName2: "Follow Users",
                tabName3: "Notifications",
            },
            recipeTab: "Recipes"
        },
    },
}