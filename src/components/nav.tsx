import * as React from "react";
import {Container} from "./container";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";

interface INavLink {
    title: string;
    to?: string;

    onClick?(): void;
}

interface INavProps {
    links?: INavLink[];
}

export const Nav: React.FC<INavProps> = ({links}) => (
    <nav className="navigation">
        <Container>
            <Link className="navigation-title" to="/"><h1 className="title">Shit counter</h1></Link>
            {
                !!links && (
                    <div className="float-right">
                        <div className="navigation-links">
                            {
                                links.map(navLink => (
                                    <Button key={navLink.title + navLink.to} className="navigation-link--wrapper">
                                        {
                                            navLink.to ?
                                                <Link className="navigation-link" to={navLink.to}><p>{navLink.title}</p>
                                                </Link>
                                                :
                                                <a
                                                    className="navigation-link"
                                                    href="/"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        navLink.onClick!!();
                                                    }}
                                                >
                                                    <p>{navLink.title}</p>
                                                </a>
                                        }
                                    </Button>
                                ))}
                        </div>
                    </div>
                )
            }
        </Container>
    </nav>
);