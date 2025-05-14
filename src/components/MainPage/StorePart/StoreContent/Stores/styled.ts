import { styled } from "styled-components";

export const StoresStyle = styled.div`
  &.Stores_wrap {
    position: relative;
    margin-top: 15px;

    .Stores-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;

      .Store_bgmCard {
        margin-bottom: 25px !important;
      }

      .Stores_card {
        padding: 12px;
        text-align: center;
        margin-bottom: 70px;

        .Stores_thumbnai {
          position: relative;
          width: 90px;
          height: 90px;
          margin: 0 auto;
        }

        .Stores_thumbnai.playing {
          width: 90px;
          height: 90px;
          animation: rotateImage 5s linear infinite;
        }

        @keyframes rotateImage {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .Stores_audio {
          width: 150px;
        }

        audio::-webkit-media-controls-volume-slider {
          display: none;
        }

        audio::-webkit-media-controls-mute-button {
          display: none;
        }

        .Stores_itemImg {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }

        .Stores_mini {
          position: relative;
          width: 25px;
          height: 73%;
          margin: 0 auto;
        }

        .Stores_gif {
          width: 50px !important;
        }

        .Stores_itemName {
          font-size: 15px;
          margin: 8px 0 4px;
          font-weight: bold;
        }

        .Stores_itemPrice {
          font-size: 14px;
          margin-bottom: 8px;
        }

        .Stores_btnWrap button {
          padding: 1px 3px;
          border: none;
          background: rgb(155, 155, 155);
          color: white;
          font-weight: bold;
          border-radius: 3px;
          cursor: pointer;
        }
      }
    }
  }
`;
