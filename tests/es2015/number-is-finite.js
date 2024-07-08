assert(Number.isFinite(1 / 1), "Number.isFinite(1 / 1)");

assert(!Number.isFinite(1 / 0), "Number.isFinite(1 / 0)");

assert(!Number.isFinite("1"), 'Number.isFinite("1")');
