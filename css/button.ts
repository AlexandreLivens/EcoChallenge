.contact-block {
    margin-top: 18px;
    padding: 18px;
    background: rgba(255, 255, 255, .92);
    border-radius: 20px;
    border: 1px solid rgba(76, 175, 80, .22);
    box-shadow: 0 16px 34px rgba(0, 0, 0, .08);
}

.contact-block p {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    margin: 12px 0;
    font-size: 15px;
}

.contact-block .icon {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 14px;
    background: rgba(76, 175, 80, .12);
    font-size: 18px;
}

.contact-block a {
    color: var(--eco-green-dark);
    font-weight: 900
}

.contact-block a:hover {
    text-decoration: underline
}

.contact-block .note {
    margin-left: auto;
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(129, 199, 132, .18);
    border: 1px solid rgba(76, 175, 80, .18);
    font-size: 12px;
    font-style: normal;
    color: #1f3d2b;
}

#contactPanel {
    display: none;
    position: fixed;
    right: 24px;
    bottom: 90px;
    z-index: 9999;
    width: min(560px, 94vw);
    max-height: calc(100vh - 140px);
    overflow: auto;
    padding: 32px 30px;
    background: radial-gradient(circle at top right, rgba(129, 199, 132, .25), transparent 45%),
    linear-gradient(160deg, #fbfffd, #e9f6ef);
    border-radius: 30px;
    border: 1px solid rgba(76, 175, 80, .20);
    box-shadow: 0 34px 80px rgba(0, 0, 0, .18);
    text-align: left;
    animation: contactUp .25s ease;
}

#contactPanel::-webkit-scrollbar {
    width: 10px
}

#contactPanel::-webkit-scrollbar-thumb {
    background: rgba(76, 175, 80, .22);
    border-radius: 999px
}

#contactPanel::-webkit-scrollbar-track {
    background: transparent
}

#contactClose {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid rgba(76, 175, 80, .28);
    background: rgba(255, 255, 255, .85);
    backdrop-filter: blur(10px);
    font-size: 18px;
    font-weight: 900;
    cursor: pointer;
    box-shadow: 0 10px 24px rgba(0, 0, 0, .12);
    transition: transform var(--t), box-shadow var(--t);
    color: black;
}

#contactClose:hover {
    transform: scale(1.06);
    box-shadow: 0 16px 32px rgba(0, 0, 0, .16);
}

.contact-intro {
    margin: 8px 0 18px 0;
    font-size: 15.5px;
    line-height: 1.6;
    color: #264c38;
}


#contactBtn {
    align-items: center;
    padding: 14px 22px;
    border-radius: var(--pill);
    background: linear-gradient(135deg, var(--white), #f1fdf4);
    border: 2px solid rgba(76, 175, 80, .25);
    color: var(--eco-green-dark);
    font-size: 16px;
    font-weight: 900;
    box-shadow: 0 16px 34px rgba(76, 175, 80, .22);
    cursor: pointer;
    transition: transform var(--t), box-shadow var(--t), filter var(--t);
    font-family: Poppins, system-ui, Arial, sans-serif;
}

#contactBtn:hover {
    transform: translateY(-2px);
    box-shadow: 0 22px 44px rgba(76, 175, 80, .32);
    filter: saturate(1.05);
}
