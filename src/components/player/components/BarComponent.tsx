import { useState } from 'react';
import styled from 'styled-components';

const BarOverBox = styled.div`
  position: relative;
  width:100%;
  max-width:608px;
  /* height:4px; */
  /* padding:10px 0; */
`

const PlayBar = styled.input`
  width:100%;
  background-color: transparent;
  /* accent-color: #00fd0a; */
  accent-color: #feac00;
  margin:0;
  position: relative;
  z-index: 2;

  &::-webkit-slider-runnable-track {
    width: 100%; height: 5px;
    /* padding:4px 0; */
    margin:0;
    cursor: pointer;
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;  */
    background-color:hsla(0,0%,100%,.3);;
    border-radius: 6px;
    border: none;
    overflow:hidden;
    box-sizing: border-box;
  }

  &::-webkit-slider-thumb{
    width:5px;
    height:5px;
    border-radius: 3px;
    background-color: #fff;
    position:relative;
    /* top:-4px; */
    opacity: 1;
    /* z-index:2; */
    /* border: 4px solid #f00; */
    border:none;

    /* background:#fff url('//image.gsshop.com/ui/gsshop/cust/images/bg_size_slider.png') no-repeat 50% 50%;
    background-size:14px auto;
    border-radius:14px; */
    /* box-shadow:0 2px 4px 0 rgba(158, 121, 121, 0.82); */
    box-shadow: -704px 0 0 700px #fff;
    -webkit-appearance:none;
    transition: all .3s ease;
  }

  &::-moz-range-thumb{
    -webkit-appearance: none;
    width:100%;
    height:100%;
    background: #fff;
    border: none;
    border-radius:50%;
    cursor: pointer;
  }

  &:hover::-webkit-slider-thumb{
    background-color:#feac00;
    box-shadow: -703px 0 0 700px #feac00;
  }
`


export default function BarComponent() {

  return (
    <BarOverBox className='playerBarBox' id='playerBarBox'>
      <PlayBar type="range" id="playBarRange" min={0} max={100} defaultValue={0} onMouseUp={() => console.log('test')}/>
    </BarOverBox>
  );
}
