import React from 'react';
import loadingGif from "../../images/loading.gif";
import sleepingCastor from "../../images/sleepingcastor.png";

export default function LoadingAppGif() {
    return (
        <div className="LoadingAppGif">
          <div className="LoadingAppGif__container">
            <img className="LoadingAppGif__image" src={sleepingCastor} alt="castor"/>
            <img className="LoadingAppGif__loadingGif" src={loadingGif} alt="chargement"/>
            <p>Réveil de la famille Castor</p>
          </div>
        </div>
    );
}
