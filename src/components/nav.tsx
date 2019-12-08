import * as React from "react";
import {Container} from "./container";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

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
            <Link className="navigation-title" to="/"><Typography variant={"h5"}>Shit counter</Typography></Link>
            {
                !!links && (
                    <div className="float-right">
                        <div className="navigation-links">
                            {
                                links.map(navLink => (
                                    <Button variant={'outlined'} key={navLink.title + navLink.to}>
                                        {
                                            navLink.to ?
                                                <Link className="navigation-link"
                                                      to={navLink.to}><Typography>{navLink.title}</Typography>
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
                                                    <Typography>{navLink.title}</Typography>
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