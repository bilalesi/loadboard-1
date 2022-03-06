import React, { useState } from "react";

function DataCardBlock({ contBlockCSS, CounterNumber, CounterNumberCSS, CounterLabel, CounterLabelCSS, expandDataLabel, logoClassText, logoClassContainerCSS, CardType }) {
    //
    //
    function LinkBottomCard() {
        if ( !CounterNumberCSS )
            CounterNumberCSS = "fs-3 fw-bold";
        if ( !CounterLabelCSS )
            CounterLabelCSS = "fs-sm fw-medium fs-sm fw-medium text-muted mb-0";

        return (
            <div className="col-sm-6 col-xxl-3">
                <div className="lb-card block block-rounded d-flex flex-column h-100 mb-0">
                    <div className="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center">
                        <dl className="mb-0">
                            <dt className={CounterNumberCSS}>{CounterNumber}</dt>
                            <dd className={CounterLabelCSS}>{CounterLabel}</dd>
                        </dl>
                        <div className="item item-rounded-lg bg-body-light">
                            <i className={logoClassText}></i>
                        </div>
                    </div>
                    <div className="bg-body-light rounded-bottom">
                        <a className="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between" href="javascript:void(0)">
                            <span>{expandDataLabel}</span>
                            <i className="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"></i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
    
    function BarebonesCard() {

        function Counter() {
            if ( !CounterNumberCSS )
                CounterNumberCSS = "fs-2 fw-semibold text-dark ms-auto me-auto";
            if ( !CounterLabelCSS )
                CounterLabelCSS = "fw-medium fs-sm text-muted mb-0";
            if ( !contBlockCSS )
                contBlockCSS = "bb-card block block-rounded block-link-shadow text-center pb-c1 d-flex flex-column position-relative justify-content-center h-80";

            const [cardContent, setContent] = useState({contBlockCSS,CounterNumberCSS,CounterLabelCSS,CounterNumber,CounterLabel});

            return (
                <div className={cardContent.contBlockCSS}>
                    <div className="block-content block-content-full">
                        <div className={cardContent.CounterNumberCSS}>{cardContent.CounterNumber}</div>
                    </div> 
                    <div className="block-content py-2 bg-body-light position-absolute b-0">
                        <p className={cardContent.CounterLabelCSS}>{cardContent.CounterLabel}</p>
                    </div>
                </div>
            );
        }
        function Icon() {
            if (!CounterNumberCSS)
                CounterNumberCSS = "fs-2 fw-semibold text-dark";
            if (!CounterLabelCSS)
                CounterLabelCSS = "fw-medium fs-sm text-muted mb-0";
            if (!logoClassContainerCSS)
                logoClassContainerCSS = "fs-2 fw-semibold";
            if (!CounterLabelCSS)
                CounterLabelCSS = "fw-medium fs-sm mb-0";
            if ( !contBlockCSS )
                contBlockCSS = "ico-card block block-rounded block-link-shadow text-center pb-c1 d-flex flex-column position-relative justify-content-center h-80";
            
            return (
                <a className={contBlockCSS} href="#">
                    <div className="block-content block-content-full">
                        <div className={logoClassContainerCSS}>
                            <i className={logoClassText}></i>
                        </div>
                    </div>
                    <div className="block-content py-2 bg-body-light position-absolute b-0">
                        <p className={CounterLabelCSS}>
                            {CounterLabel}
                        </p>
                    </div>
                </a>
            );
        }
        
        var contentSection = (!logoClassText) ? Counter() : Icon();

        return (
            <div className="col-sm-6 col-xxl-3">
                {contentSection}
            </div>
        );
    }
    //
    //
    switch (CardType){
        case "Barebones":
            return (
                <BarebonesCard/>
            );
        break;
        case "LinkBottom":
            return (
                <LinkBottomCard/>
              );
        break;
    }
}

export default DataCardBlock;