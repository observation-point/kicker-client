import React from 'react';
import Goals from './Goals';
import playerImg from './user.svg';
import playerRedImg from './user_red.svg';
import plusImg from './plus.svg';
import plusRedImg from './plus_red.svg';
import Title from '../components/Title';
import ChanceSlider from './ChanceSlider';

const NOT_A_DATE = '- : -';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.timer = setInterval(
            () =>
                this.setState({
                    time: this.props.startGame
                        ? Date.now() - new Date(this.props.startGame)
                        : NOT_A_DATE
                }),
            1
        );
    }

    render() {
        const { startGame, joinAs, getGoalCount, goals } = this.props;
        const { redAttack, redDef, blackAttack, blackDef } = this.props.players;
        const redWinrate = redAttack && redDef ? Math.round((redAttack.winRate + redDef.winRate) / 2) : 0.2;
        const blackWinrate = blackAttack && blackDef ? Math.round((blackAttack.winRate + blackDef.winRate) / 2) : 0.2;

        return (
            <div id="game_root" className="game_root">
                <Title pageTitle={getGoalCount()} />
                <div className="game_table">
                    <Goals goals={goals} startGame={startGame} />
                    <ChanceSlider redWinrate={redWinrate} blackWinrate={blackWinrate} goals={goals} />

                    <div className="game_title">kicker.lan</div>

                    <div
                        className="player_button red attack"
                        disabled={!!redAttack}
                        onClick={() => joinAs('attack', 'RED')}
                    >
                        {!!redAttack ? (
                            <React.Fragment>
                            <img alt=" " className="ava" src={redAttack.user.avatar ?
                            redAttack.user.avatar : playerRedImg} />
                            <span className="role_name">{redAttack.user.fullname}</span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <img alt=" " className="role-char" src={plusRedImg} />
                                <span className="role_name">attack</span>
                            </React.Fragment>
                        )}
                    </div>
                    <div
                        className="player_button red defense"
                        disabled={!!redDef}
                        onClick={() => joinAs('defense', 'RED')}
                    >
                        {!!redDef ? (
                            <React.Fragment>
                                <img alt=" " className="ava" src={redDef.user.avatar ?
                                redDef.user.avatar : playerRedImg} />
                                <span className="role_name">{redDef.user.fullname}</span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <span className="role_name">defense</span>
                                <img alt=" " className="role-char" src={plusRedImg} />
                            </React.Fragment>
                        )}
                    </div>
                    <div
                        className="player_button black attack"
                        disabled={!!blackAttack}
                        onClick={() => joinAs('attack', 'BLACK')}
                    >
                        {!!blackAttack ? (
                            <React.Fragment>
                                <img alt=" " className="ava" src={blackAttack.user.avatar ?
                                blackAttack.user.avatar : playerImg} />
                                <span className="role_name">{blackAttack.user.fullname}</span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <img alt=" " className="role-char" src={plusImg} />
                                <span className="role_name">attack</span>
                            </React.Fragment>
                        )}
                    </div>
                    <div
                        className="player_button black defense"
                        disabled={!!blackDef}
                        onClick={() => joinAs('defense', 'BLACK')}
                    >
                        {!!blackDef ? (
                            <React.Fragment>
                                <img alt=" " className="ava" src={blackDef.user.avatar ?
                                blackDef.user.avatar : playerImg} />
                                <span className="role_name">{blackDef.user.fullname}</span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <span className="role_name">defense</span>
                                <img alt=" " className="role-char" src={plusImg} />
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
