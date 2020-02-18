$(function () {
    // Start WoW Library
    new WOW().init();

    // Get the window withs and height
    var win         = window,
        winWidth    = win.innerWidth,
        winHeight   = win.innerHeight,
        indexHeader = $('.index-header'),
        navBar      = $('.navbar-default')
        
        // console.log(navBar.outerHeight())
        // console.log()
    $(win).on('resize', () => {
        win         = window
        winWidth    = win.innerWidth
        winHeight   = win.innerHeight
        // console.log(winWidth)
        // console.log(widHeight)

        // Make The Index Header Page Resize
        // indexHeader.css('height', winHeight+ 'px') 

        // ******** Start Resize the carousel in index page **************
            if(winWidth >= 992){
                indexHeader.css('height', winHeight+ 'px') 
            }else if(winWidth < 991 && winWidth > 769 ){
                indexHeader.css('height', '500px') 
            }else if(winWidth < 991){
                indexHeader.css('height', '300px')
            }
        // ******** End Resize the carousel in index page **************
    })

    




    // ******** Start Resize the carousel in index page **************
    if(winWidth >= 992){
        indexHeader.css('height', winHeight+ 'px') 
    }else if(winWidth < 991 && winWidth > 769 ){
        indexHeader.css('height', '500px') 
    }else if(winWidth < 991){
        indexHeader.css('height', '300px')
    }

    // Change the Image 
    
    var indexImg    = $('.index-header .img-con'),
        img         = $('.index-header .img-con img')

        setInterval(() => {
            img.each(() => {
                console.log($(this).hasClass("active"))
                if($(this).hasClass('active')){
                    $(this).removeClass('active')
                    console.log('Hi From Else')
                }else{
                    // console.log('hi from else')
                }   
                
            })

        }, 1000)

    // ******** End Resize the carousel in index page **************


    // Make the Header Index Page Take The Size Of the Screen
    // Make The Index Header Page Resize
    // indexHeader.css('height', winHeight+ 'px') 
    // indexHeader.css('margin-top', -navBar.outerHeight() + 'px')

    // console.log(navBar.outerHeight());

    //*********  Start The News Bar Scripting ********* 
    var parentNews 		= $('.news-bar'),
		newsBar 		= $('.news-bar .bar-word'),
		innerNewsBar 	= $('.news-bar .bar-word  ul li:last-of-type'),
		rightNewsBar 	= parentNews.outerWidth(),
		timerNewsBar    = null;//used when the user hover on the bar then stop the bar and move otherwise
		newsBar.css('right', rightNewsBar); //initialize the position of the definition bar


    function checkNewsBar() {

        //check the news bar
        // console.log(parentNews.offset().left)
        // console.log(parentNews.outerWidth())
        // console.log(innerNewsBar.offset().left)
		if(parentNews.offset().left >  innerNewsBar.offset().left){
			
			rightNewsBar = parentNews.outerWidth();
			newsBar.css('left', rightNewsBar);
		}else{
			rightNewsBar -= .5;
			newsBar.css('left', rightNewsBar);
		}

        startNewsBar();        // restart the timerNewsBar
    };

    function startNewsBar() {  // use a one-off timerNewsBar
        timerNewsBar = setTimeout(checkNewsBar, 10);
    };

    function stopNewsBar() {
        clearTimeout(timerNewsBar);
    };

    newsBar.on('mouseenter', stopNewsBar);
    newsBar.on('mouseleave', startNewsBar);

    startNewsBar();  // if you want it to auto-start)

    //set time in the logo of news bar
    // get the local time to print in navbar
	var now 	= new Date(),
		$amORpm = 'pm',
		hours 	= ['12', '01', '02','03','04','05','06','07','08','09','10','11','12', /* night */
					'01', '02','03','04','05','06','07','08','09','10','11'],
		getMin = now.getMinutes() < 10 ? '0' + now.getMinutes(): now.getMinutes() ;;

	$('#time').text(hours[now.getHours()] + ':' + getMin + ' ' + $amORpm);


	setInterval(function() {
		if(now.getHours() < 12) $amORpm = 'am'; //fro 0 to 11 indexes
		getMin = now.getMinutes() < 10 ? '0' + now.getMinutes(): now.getMinutes() ;

		now = new Date();
		$('#time').text(hours[now.getHours()] + ':' + getMin + ' ' + $amORpm);
	}, 1000)

    //********* End The News Bar Scripting ********* 

    // ******** Start Handle Search Icon in NavBar ***************
    // ******** Start Handle Search Icon in NavBar ***************
    let searchIcon  = $('.navbar .search-icon'),
    searchBody      = $('.search-body'),
    searchForm      = $('.search-body form'),
    searchInput     = $('.search-body input[type=text]'),
    searchResult    = $('.search-result'),
    noResult        = $('.search-result .no-result'),
    resultBody      = $('.search-result .result-body'),
    closeIcon       = $('.search-body form .close-icon, .search-result .close-icon i')

    searchIcon.on('click', () => {
        searchBody.fadeIn()
        searchInput.focus()

    });
    closeIcon.on('click', () => {
        searchBody.fadeOut(() => {
            searchForm.fadeIn();
            searchInput.val('')
            searchResult.fadeOut()
            noResult.fadeOut()
        });
        
    })

    // Change the Products in the navbar
    // let products_drop   = $('.nav.navbar-nav li').eq(1),
    //     products_a      =  $('.nav .dropdown a');

    //     console.log(products_drop.eq(1).text())

    //     products_drop


    searchForm.on('submit', (e) => {
        e.preventDefault();
        searchForm.fadeOut(() => {
            searchResult.fadeIn();
            let isNoResult = true; //check if there is no result to show no result window
            resultBody.html('') //empty the result container first

            if(searchInput.val().length > 0){ //if there is input value
                
                //Seach the result in product List
                productList.forEach((data) => {
                    let name    = data.name.toLocaleLowerCase(),
                        img     = data.img,
                        link    = data.link,
                        cat     = data.cat,
                        target  = searchInput.val().toLocaleLowerCase()

                    //if there is result
                    if(name.match(target)){

                        isNoResult = false;  //that means there is result don't show no result window
                        
                        //display the result here
                        resultBody.append(`
                            <div class="one-result" >
                                <div class="col-sm-8">
                                    <div class="result-detail">
                                        <h4><a href="${link}">${data.name}</a></h4>
                                        <div class="cat">${cat}</div>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="img-con">
                                        <img class="img-responsive img-rounded" src="${img}" alt="Image">
                                    </div>
                                </div>
                            </div>
                        `);
                    }  
                        
                })


            }

            //show no result window if the input field is empty or there is no result found
            if(isNoResult || searchInput.val().length == 0){
                resultBody.append(`
                    <div class="no-result">
                        <h3 class="text-center">There is no Reult</h3>
                    </div>
                `);
            }
        })
        
        // Make sure The result is ok
        console.log(searchInput.val())
    });

    var productList = [

        // ************ Start Anaesthesia Products ************
        {
            name: 'Oral Syrings 5ml - 3pcs',
            cat:  'Products',
            img: imgPath + 'images/products/Oral Syrings 5ml - 3pcs.jpeg',
            link: linkPath + 'pages/products/Oral Syrings 5ml - 3pcs.html'
        },
        {
            name: 'sterile medical syringe 1ml',
            cat:  'Products',
            img: imgPath + 'images/products/sterile medical syringe 1ml.jpeg',
            link: linkPath + 'pages/products/sterile medical syringe 1ml.html'
        },
        {
            name: 'sterile medical syringe 3ml(Adult)',
            cat:  'Products',
            img: imgPath + 'images/products/sterile medical syringe 3ml(Adult).jpeg',
            link: linkPath + 'pages/products/sterile medical syringe 3ml(Adult).html'
        },
        {
            name: 'sterile medical syringe 3ml(Child)',
            cat:  'Products',
            img: imgPath + 'images/products/sterile medical syringe 3ml(Child).jpeg',
            link: linkPath + 'pages/products/sterile medical syringe 3ml(Child).html'
        },
        {
            name: 'sterile medical syringe 5ml',
            cat:  'Products',
            img: imgPath + 'images/products/sterile medical syringe 5ml.jpeg',
            link: linkPath + 'pages/products/sterile medical syringe 5ml.html'
        },
        {
            name: 'sterile medical syringe 10ml',
            cat:  'Products',
            img: imgPath + 'images/products/sterile medical syringe 10ml.jpeg',
            link: linkPath + 'pages/products/sterile medical syringe 10ml.html'
        }
        

    ]



    // Add dev by after the footer
    $('footer').after(`
        <div class='dev-by'>
            Developed by <strong>ProTech</strong> 
            <i class='fa fa-mobile'></i> 01016195209

        </div>`)


    // console.log(location.search.split('?'))
    // ******** End Handle Search Icon in NavBar ***************
    

})