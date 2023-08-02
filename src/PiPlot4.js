import React from "react";
import Plot from "react-plotly.js";

class PiPlot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      piValue: 0,
      n: 5000,
      x_in: [],
      y_in: [],
      x_out: [],
      y_out: [],
    };
  }

  componentDidMount() {
    this.generatePlot();
  }

  generatePlot = () => {
    const { n } = this.state;
    let inside = 0;
    const x_in = [];
    const y_in = [];
    const x_out = [];
    const y_out = [];

    for (let i = 0; i < n; i++) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      if (x ** 2 + y ** 2 <= 1) {
        inside += 1;
        x_in.push(x);
        y_in.push(y);
      } else {
        x_out.push(x);
        y_out.push(y);
      }
    }

    const pi = (4 * inside) / n;
    this.setState({ piValue: pi, x_in, y_in, x_out, y_out });
  };

  handleNChange = (event) => {
    this.setState({ n: parseInt(event.target.value, 10) });
  };

  handleButtonClick = () => {
    this.generatePlot();
  };

  render() {
    const { piValue, x_in, y_in, x_out, y_out, n } = this.state;

    return (
      <div>
        {/* Form to choose 'n' */}
        <form>
          <label>
            n:
            <input type="number" value={n} onChange={this.handleNChange} />
          </label>
          <button type="button" onClick={this.handleButtonClick}>
            Generate Plot
          </button>
          {/* Display the calculated value of pi */}
          <div>
            <strong>Calculated Pi:</strong> {piValue.toFixed(6)}
          </div>
        </form>

        {/* Your custom plot using x_in, y_in, x_out, y_out */}
        <Plot
          data={[
            {
              x: x_in,
              y: y_in,
              mode: "markers",
              type: "scatter",
              marker: { color: "blue", size: 5 },
            },
            {
              x: x_out,
              y: y_out,
              mode: "markers",
              type: "scatter",
              marker: { color: "red", size: 5 },
            },
          ]}
          layout={{
            width: 600,
            height: 600,
            xaxis: {
              range: [-1.5, 1.5],
              scaleanchor: "y",
              scaleratio: 1,
              ticks: "outside",
              tickvals: [-1, -0.5, 0, 0.5, 1],
              ticktext: ["-1", "-0.5", "0", "0.5", "1"],
              tickmode: "array",
              tickangle: 0,
              tickfont: { size: 10 },
              showline: true,
              showgrid: true,
              gridwidth: 1,
              gridcolor: "lightgray",
              zeroline: false,
            },
            yaxis: {
              range: [-1.5, 1.5],
              scaleanchor: "x",
              scaleratio: 1,
              ticks: "outside",
              tickvals: [-1, -0.5, 0, 0.5, 1],
              ticktext: ["-1", "-0.5", "0", "0.5", "1"],
              tickmode: "array",
              tickangle: 0,
              tickfont: { size: 10 },
              showline: true,
              showgrid: true,
              gridwidth: 1,
              gridcolor: "lightgray",
              zeroline: false,
            },
            title: `Pi number using random numbers  Pi: ${piValue.toFixed(2)}`,
          }}
        />
      </div>
    );
  }
}

export default PiPlot;
